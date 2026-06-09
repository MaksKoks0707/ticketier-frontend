import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="card">
        <h1>Ticketier Frontend</h1>
        <p>Browse venues, artists, events, tickets, and manage your purchases through the Ticketier API.</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <Link href="/browse/venues" className="button">
            Browse Venues
          </Link>
          <Link href="/browse/events" className="button">
            Browse Events
          </Link>
          <Link href="/browse/tickets" className="button">
            Browse Tickets
          </Link>
        </div>
      </section>
      <section className="card">
        <h2>Getting started</h2>
        <p>Use the navigation to explore the public Ticketier API. Login to purchase tickets or view your purchased tickets.</p>
      </section>
    </div>
  );
}
