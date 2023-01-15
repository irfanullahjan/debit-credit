import { cookies } from "next/headers";

export function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  const jwt = cookies().get("jwt")?.value;
  if (jwt) {
    headers.set("Authorization", `Bearer ${jwt}`);
  }
  return fetch(input, { ...init, headers }).then((res) => res.json());
}
