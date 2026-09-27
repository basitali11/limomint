# LimoMint Contact Backend

FastAPI service that validates contact form submissions, sends a branded HTML enquiry to the business inbox, and sends a branded receipt to the visitor through SMTP. Both emails include a plain-text alternative for mail clients that do not display HTML.

## Local setup (Windows PowerShell)

Use Python 3.10 or newer.

From the project root:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` with the SMTP account details and the inbox that should receive contact requests. For Gmail, create and use an App Password; a normal Gmail password will not work with SMTP sign-in.

Start the API from the `backend` directory:

```powershell
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API health endpoint is `http://localhost:8000/health`; interactive API documentation is at `http://localhost:8000/docs`.

## Connect the Next.js website

The form defaults to `http://localhost:8000`. If the API is hosted elsewhere, set this variable in the website root's `.env.local` and restart Next.js:

```env
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:8000
```

Set `FRONTEND_ORIGINS` in the backend `.env` to the exact website origin(s), including protocol and port. For production, use the deployed HTTPS website origin and the deployed backend URL.

## SMTP options

- `SMTP_SECURITY=starttls` for a typical SMTP submission server on port 587.
- `SMTP_SECURITY=ssl` for SMTP over TLS, commonly port 465.
- `SMTP_SECURITY=none` only for a trusted relay that does not require authentication. The API rejects SMTP credentials when this mode is selected.

SMTP credentials stay in the backend environment and are never sent to the browser.
