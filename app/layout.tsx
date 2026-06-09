import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Ticketier Frontend",
  description: "Browse venues, artists, events, and tickets for the Ticketier API"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <div className="container">
            <div>
              <a href="/">Ticketier</a>
            </div>
            <Nav />
          </div>
        </div>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
