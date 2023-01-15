import { cookies } from "next/headers";

export function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  const jwt = cookies().get("jwt")?.value;
  console.log("jwt", jwt);
  if (jwt) {
    headers.set("Authorization", `Bearer ${jwt}`);
  }
  return fetch(input, { ...init, headers }).then((res) => {
    if (!res.ok) {
      console.error(`Error fetching ${input}: ${res.status} ${res.statusText}`);
    }
    return res.json();
  });
}
