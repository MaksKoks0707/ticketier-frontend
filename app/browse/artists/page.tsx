"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { Artist } from "../../../lib/types";

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Artist[]>("/artists")
      .then(setArtists)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load artists"));
  }, []);

  return (
    <section className="card">
      <h1>Artists</h1>
      {error && <p className="status">{error}</p>}
      {artists.length === 0 ? (
        <p>No artists available yet.</p>
      ) : (
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              <Link href={`/browse/artists/${artist.id}`}>{artist.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
