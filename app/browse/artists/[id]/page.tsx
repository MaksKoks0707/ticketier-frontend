"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "../../../../lib/api";
import { Artist } from "../../../../lib/types";

export default function ArtistDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [artist, setArtist] = useState<Artist | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch<Artist>(`/artists/${id}`)
      .then(setArtist)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load artist"));
  }, [id]);

  return (
    <section className="card">
      <h1>Artist Details</h1>
      {error && <p className="status">{error}</p>}
      {!artist ? (
        <p>Loading artist...</p>
      ) : (
        <div>
          <p><strong>Name:</strong> {artist.name}</p>
        </div>
      )}
    </section>
  );
}
