import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://limomint.vercel.app"),
  openGraph: {
    siteName: "LimoMint",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  title: "LimoMint | Private Chauffeur Service in Toronto",
  description:
    "Book a private, chauffeur-driven ride in Toronto with LimoMint. Arrange point-to-point trips, airport transfers, and hourly service.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-ink text-paper font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
