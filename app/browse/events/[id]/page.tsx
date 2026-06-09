"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "../../../../lib/api";
import { Event } from "../../../../lib/types";

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch<Event>(`/events/${id}`)
      .then(setEvent)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load event"));
  }, [id]);

  return (
    <section className="card">
      <h1>Event Details</h1>
      {error && <p className="status">{error}</p>}
      {!event ? (
        <p>Loading event...</p>
      ) : (
        <div>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Type:</strong> {event.event_type}</p>
          <p><strong>Artist ID:</strong> {event.artist_id}</p>
          <p><strong>Venue ID:</strong> {event.venue_id}</p>
        </div>
      )}
    </section>
  );
}
