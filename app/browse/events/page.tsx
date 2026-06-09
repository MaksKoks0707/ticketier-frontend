"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { Event } from "../../../lib/types";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Event[]>("/events")
      .then(setEvents)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load events"));
  }, []);

  return (
    <section className="card">
      <h1>Events</h1>
      {error && <p className="status">{error}</p>}
      {events.length === 0 ? (
        <p>No events available yet.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <Link href={`/browse/events/${event.id}`}>
                {event.date} · {event.event_type} · Artist {event.artist_id} · Venue {event.venue_id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
