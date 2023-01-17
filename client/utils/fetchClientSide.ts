import { BASE_URL } from "@/common/constants";
import { cookies } from "next/headers";
import { fetchJson } from "./fetchJson";

export function fetchClientSide(input: RequestInfo | URL, init?: RequestInit) {
  if (typeof input === "string" && !input.startsWith("http")) {
    input = new URL(`/api${input}`, BASE_URL);
  }
  return fetch(input, init);
}
