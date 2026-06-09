"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout, getAccessToken } from "../lib/api";

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(Boolean(getAccessToken()));
  }, []);

  async function handleLogout() {
    await logout();
    setLoggedIn(false);
    router.push("/");
  }

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/browse/venues">Venues</Link>
      <Link href="/browse/artists">Artists</Link>
      <Link href="/browse/events">Events</Link>
      <Link href="/browse/tickets">Tickets</Link>
      {loggedIn ? (
        <>
          <Link href="/my-tickets">My Tickets</Link>
          <button className="button secondary" type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </>
      )}
    </nav>
  );
}
