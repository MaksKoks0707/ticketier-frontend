"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { Venue } from "../../../lib/types";

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Venue[]>("/venues")
      .then(setVenues)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load venues"));
  }, []);

  return (
    <section className="card">
      <h1>Venues</h1>
      {error && <p className="status">{error}</p>}
      {venues.length === 0 ? (
        <p>No venues available yet.</p>
      ) : (
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              <Link href={`/browse/venues/${venue.id}`}>
                {venue.address}, {venue.city}, {venue.country}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
