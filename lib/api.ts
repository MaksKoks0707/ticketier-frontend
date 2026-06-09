import { AccessTokenResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const STORAGE_KEY = "ticketier_access_token";

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

function setStoredToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, token);
}

export function clearStoredToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return {} as T;
  }

  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(`Invalid JSON response from API: ${text}`);
  }
}

async function refreshAccessToken(): Promise<AccessTokenResponse | null> {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });

  if (!response.ok) {
    return null;
  }

  const data = await parseResponse<AccessTokenResponse>(response);
  if (data.access_token) {
    setStoredToken(data.access_token);
  }
  return data;
}

async function getApiError(response: Response): Promise<Error> {
  const message = await response.text();
  return new Error(message || response.statusText || "API request failed");
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined)
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers
  });

  const newToken = response.headers.get("x-new-token");
  if (newToken) {
    setStoredToken(newToken);
  }

  if (response.ok) {
    return parseResponse<T>(response);
  }

  if (response.status === 401 && token) {
    const refreshed = await refreshAccessToken();
    if (refreshed?.access_token) {
      headers.Authorization = `Bearer ${refreshed.access_token}`;
      const retry = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        ...options,
        headers
      });
      if (retry.ok) {
        const retryNewToken = retry.headers.get("x-new-token");
        if (retryNewToken) setStoredToken(retryNewToken);
        return parseResponse<T>(retry);
      }
      throw await getApiError(retry);
    }
  }

  throw await getApiError(response);
}

export async function login(username: string, password: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw await getApiError(response);
  }

  const data = await parseResponse<AccessTokenResponse>(response);
  setStoredToken(data.access_token);
}

export async function register(username: string, email: string, password: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    throw await getApiError(response);
  }
}

export async function logout(): Promise<void> {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
  clearStoredToken();
}

export function getAccessToken(): string | null {
  return getStoredToken();
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredToken());
}
