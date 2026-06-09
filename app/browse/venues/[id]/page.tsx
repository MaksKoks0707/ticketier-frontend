"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "../../../../lib/api";
import { Venue } from "../../../../lib/types";

export default function VenueDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [venue, setVenue] = useState<Venue | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch<Venue>(`/venues/${id}`)
      .then(setVenue)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load venue"));
  }, [id]);

  return (
    <section className="card">
      <h1>Venue Details</h1>
      {error && <p className="status">{error}</p>}
      {!venue ? (
        <p>Loading venue...</p>
      ) : (
        <div>
          <p><strong>Address:</strong> {venue.address}</p>
          <p><strong>City:</strong> {venue.city}</p>
          <p><strong>Country:</strong> {venue.country}</p>
        </div>
      )}
    </section>
  );
}
