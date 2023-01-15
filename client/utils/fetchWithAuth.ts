import { cookies } from "next/headers";
import { fetchJson } from "./fetchJson";

export function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  const jwt = cookies().get("jwt")?.value;
  console.log("jwt", jwt);
  if (jwt) {
    headers.set("Authorization", `Bearer ${jwt}`);
  }
  return fetchJson(input, { ...init, headers });
}
