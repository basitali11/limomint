import logging
import os
import smtplib
import ssl
from dataclasses import dataclass
from email.message import EmailMessage
from email.utils import formataddr
from html import escape

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.concurrency import run_in_threadpool

load_dotenv()

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO").upper())
logger = logging.getLogger("limomint.contact")


class ContactRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    message: str = Field(min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    message: str
    confirmation_email_sent: bool


@dataclass(frozen=True)
class SMTPConfig:
    host: str
    port: int
    security: str
    username: str
    password: str
    sender: str
    recipient: str


def get_smtp_config() -> SMTPConfig:
    try:
        port = int(os.getenv("SMTP_PORT", "587"))
    except ValueError as exc:
        raise HTTPException(status_code=503, detail="Email service is not configured correctly.") from exc

    config = SMTPConfig(
        host=os.getenv("SMTP_HOST", "").strip(),
        port=port,
        security=os.getenv("SMTP_SECURITY", "starttls").strip().lower(),
        username=os.getenv("SMTP_USERNAME", "").strip(),
        password=os.getenv("SMTP_PASSWORD", ""),
        sender=os.getenv("SMTP_FROM_EMAIL", "").strip(),
        recipient=os.getenv("CONTACT_TO_EMAIL", "").strip(),
    )

    if not all((config.host, config.sender, config.recipient)):
        raise HTTPException(status_code=503, detail="Email service is not configured.")
    if config.security not in {"starttls", "ssl", "none"}:
        raise HTTPException(status_code=503, detail="Email service security must be starttls, ssl, or none.")
    if bool(config.username) != bool(config.password):
        raise HTTPException(status_code=503, detail="Both SMTP username and password must be configured.")
    if config.security == "none" and config.username:
        raise HTTPException(status_code=503, detail="SMTP authentication requires a secure connection.")

    return config


def make_email(
    *, subject: str, sender: str, recipient: str, reply_to: str, text_body: str, html_body: str
) -> EmailMessage:
    email = EmailMessage()
    email["Subject"] = subject
    email["From"] = formataddr(("LimoMint", sender))
    email["To"] = recipient
    email["Reply-To"] = reply_to
    email.set_content(text_body)
    email.add_alternative(html_body, subtype="html")
    return email


def branded_html_email(*, eyebrow: str, heading: str, intro: str, content: str) -> str:
    return f"""<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f2ea;color:#202923;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f5f2ea" style="background:#f5f2ea;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" bgcolor="#fffdf8" style="width:100%;max-width:600px;background:#fffdf8;border:1px solid #d8d1c4;">
          <tr><td bgcolor="#172321" style="padding:28px 32px;background:#172321;border-bottom:3px solid #88652f;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;letter-spacing:1px;color:#f5f2ea;">LIMO<span style="color:#d8bd8a;">MINT</span></p>
            <p style="margin:6px 0 0;font-size:12px;letter-spacing:1px;color:#c9c2b3;">Private chauffeur</p>
          </td></tr>
          <tr><td style="padding:34px 32px 12px;">
            <p style="margin:0 0 10px;color:#745526;font-size:13px;font-weight:bold;letter-spacing:0.5px;">{eyebrow}</p>
            <h1 style="margin:0;color:#202923;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:normal;line-height:1.25;">{heading}</h1>
            <p style="margin:16px 0 0;color:#566159;font-size:15px;line-height:1.65;">{intro}</p>
          </td></tr>
          <tr><td style="padding:16px 32px 32px;">{content}</td></tr>
          <tr><td bgcolor="#ece8de" style="padding:20px 32px;background:#ece8de;border-top:1px solid #d8d1c4;color:#5f685f;font-size:12px;line-height:1.6;">
            LimoMint | Private chauffeur service in Toronto and surrounding areas<br>
            <a href="mailto:{escape(os.getenv('CONTACT_TO_EMAIL', ''), quote=True)}" style="color:#745526;text-decoration:none;">Contact LimoMint</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>"""


def build_owner_email(contact: ContactRequest, config: SMTPConfig) -> EmailMessage:
    name = escape(contact.name)
    visitor_email = escape(str(contact.email), quote=True)
    phone = escape(contact.phone or "Not provided")
    message_html = escape(contact.message).replace("\n", "<br>")
    details_html = f"""
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;line-height:1.6;">
        <tr><td style="padding:10px 0;width:110px;color:#5f685f;vertical-align:top;">Name</td><td style="padding:10px 0;color:#202923;font-weight:bold;">{name}</td></tr>
        <tr><td style="padding:10px 0;border-top:1px solid #d8d1c4;color:#5f685f;vertical-align:top;">Email</td><td style="padding:10px 0;border-top:1px solid #d8d1c4;"><a href="mailto:{visitor_email}" style="color:#745526;text-decoration:none;">{visitor_email}</a></td></tr>
        <tr><td style="padding:10px 0;border-top:1px solid #d8d1c4;color:#5f685f;vertical-align:top;">Phone</td><td style="padding:10px 0;border-top:1px solid #d8d1c4;color:#202923;">{phone}</td></tr>
      </table>
      <div style="margin-top:20px;padding:18px 20px;background:#f5f2ea;border:1px solid #d8d1c4;border-left:3px solid #88652f;color:#202923;font-size:14px;line-height:1.7;">
        <p style="margin:0 0 8px;color:#5f685f;font-size:13px;font-weight:bold;">Message</p>
        {message_html}
      </div>
      <p style="margin:22px 0 0;"><a href="mailto:{visitor_email}" style="display:inline-block;padding:13px 22px;background:#172321;border-radius:2px;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Reply to {name}</a></p>
    """
    html_body = branded_html_email(
        eyebrow="Website contact form",
        heading="A new enquiry has arrived.",
        intro="A visitor has sent a message through the LimoMint website. Reply directly to continue the conversation.",
        content=details_html,
    )
    text_body = (
        "A new message was submitted through the LimoMint contact form.\n\n"
        f"Name: {contact.name}\n"
        f"Email: {contact.email}\n"
        f"Phone: {contact.phone or 'Not provided'}\n\n"
        "Message:\n"
        f"{contact.message}\n"
    )
    return make_email(
        subject="LimoMint | New contact enquiry",
        sender=config.sender,
        recipient=config.recipient,
        reply_to=str(contact.email),
        text_body=text_body,
        html_body=html_body,
    )


def build_customer_email(contact: ContactRequest, config: SMTPConfig) -> EmailMessage:
    name = escape(contact.name)
    message_html = escape(contact.message).replace("\n", "<br>")
    summary_html = f"""
      <p style="margin:0 0 12px;color:#566159;font-size:14px;line-height:1.6;">A copy of your message:</p>
      <div style="padding:18px 20px;background:#f5f2ea;border:1px solid #d8d1c4;border-left:3px solid #88652f;color:#202923;font-size:14px;line-height:1.7;">{message_html}</div>
      <p style="margin:20px 0 0;color:#566159;font-size:14px;line-height:1.6;">For anything time-sensitive, call <a href="tel:+16479288894" style="color:#745526;text-decoration:none;">647-928-8894</a>.</p>
    """
    html_body = branded_html_email(
        eyebrow="We have your message",
        heading=f"Thank you, {name}.",
        intro="Your enquiry has reached LimoMint. The trip details will be reviewed, and a reply will follow as soon as possible.",
        content=summary_html,
    )
    text_body = (
        f"Hello {contact.name},\n\n"
        "Thank you for contacting LimoMint. Your enquiry has been received and will be reviewed. "
        "A reply will follow as soon as possible.\n\n"
        "A copy of your message:\n"
        f"{contact.message}\n\n"
        "For anything time-sensitive, call 647-928-8894.\n"
    )
    return make_email(
        subject="LimoMint | We received your message",
        sender=config.sender,
        recipient=str(contact.email),
        reply_to=config.recipient,
        text_body=text_body,
        html_body=html_body,
    )


def send_smtp_message(email: EmailMessage, config: SMTPConfig) -> None:
    context = ssl.create_default_context()
    if config.security == "ssl":
        server_context = smtplib.SMTP_SSL(config.host, config.port, timeout=15, context=context)
    else:
        server_context = smtplib.SMTP(config.host, config.port, timeout=15)

    with server_context as server:
        if config.security == "starttls":
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
        if config.username:
            server.login(config.username, config.password)
        refused_recipients = server.send_message(email)
        if refused_recipients:
            raise smtplib.SMTPRecipientsRefused(refused_recipients)


def send_contact_emails(contact: ContactRequest, config: SMTPConfig) -> bool:
    send_smtp_message(build_owner_email(contact, config), config)

    try:
        # Use a fresh SMTP session so one accepted message cannot leave the server
        # session in a state that prevents delivery of the visitor's receipt.
        send_smtp_message(build_customer_email(contact, config), config)
        return True
    except (smtplib.SMTPException, OSError) as exc:
        smtp_code = getattr(exc, "smtp_code", None)
        code_suffix = f" (SMTP {smtp_code})" if smtp_code is not None else ""
        logger.error("Enquiry delivered, but SMTP did not accept the visitor receipt%s", code_suffix)
        return False


app = FastAPI(title="LimoMint Contact API", version="1.0.0")

allowed_origins = [
    origin.strip().rstrip("/")
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest) -> ContactResponse:
    config = get_smtp_config()
    try:
        confirmation_sent = await run_in_threadpool(send_contact_emails, contact, config)
    except (smtplib.SMTPException, OSError) as exc:
        smtp_code = getattr(exc, "smtp_code", None)
        code_suffix = f" (SMTP {smtp_code})" if smtp_code is not None else ""
        logger.error("Failed to deliver contact enquiry%s", code_suffix)
        raise HTTPException(status_code=502, detail="The message could not be sent. Please try again later.") from None

    logger.info("Contact form email sent")
    return ContactResponse(
        message="Your message has been sent.",
        confirmation_email_sent=confirmation_sent,
    )
