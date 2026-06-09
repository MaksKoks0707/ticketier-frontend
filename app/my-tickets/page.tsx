"use client";

import { useEffect, useState } from "react";
import { apiFetch, isAuthenticated } from "../../lib/api";
import { Ticket } from "../../lib/types";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      setError("Please login to view your tickets.");
      return;
    }

    apiFetch<Ticket[]>("/me/tickets")
      .then(setTickets)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load your tickets"));
  }, []);

  return (
    <section className="card">
      <h1>My Tickets</h1>
      {error && <p className="status">{error}</p>}
      {tickets.length === 0 ? (
        <p>No purchased tickets found.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              Ticket #{ticket.id} - ${ticket.price} (Event {ticket.event_id})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
