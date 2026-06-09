"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch, getAccessToken } from "../../../../lib/api";
import { Ticket } from "../../../../lib/types";

export default function TicketDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch<Ticket>(`/tickets/${id}`)
      .then(setTicket)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load ticket"));
  }, [id]);

  async function handlePurchase() {
    setMessage(null);
    if (!getAccessToken()) {
      setMessage("Please login to purchase tickets.");
      return;
    }

    try {
      const result = await apiFetch<{ message: string }>(`/tickets/${id}/purchase`, {
        method: "POST"
      });
      setMessage(result.message);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not purchase ticket");
    }
  }

  return (
    <section className="card">
      <h1>Ticket Details</h1>
      {error && <p className="status">{error}</p>}
      {!ticket ? (
        <p>Loading ticket...</p>
      ) : (
        <div>
          <p><strong>ID:</strong> {ticket.id}</p>
          <p><strong>Price:</strong> ${ticket.price}</p>
          <p><strong>Event ID:</strong> {ticket.event_id}</p>
          <button className="button" type="button" onClick={handlePurchase}>
            Purchase Ticket
          </button>
          {message && <p className="status">{message}</p>}
        </div>
      )}
    </section>
  );
}
