"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    try {
      await login(username, password);
      router.push("/");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    }
  }

  return (
    <section className="card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Login</button>
        {message && <p className="status">{message}</p>}
      </form>
    </section>
  );
}
