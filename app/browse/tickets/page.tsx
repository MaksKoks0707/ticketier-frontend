"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { Ticket } from "../../../lib/types";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Ticket[]>("/tickets")
      .then(setTickets)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load tickets"));
  }, []);

  return (
    <section className="card">
      <h1>Tickets</h1>
      {error && <p className="status">{error}</p>}
      {tickets.length === 0 ? (
        <p>No tickets available yet.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <Link href={`/browse/tickets/${ticket.id}`}>Ticket #{ticket.id} - ${ticket.price}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
