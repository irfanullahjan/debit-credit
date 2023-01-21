import { useState } from "react";
import { Intent, useAlertsStore } from "../stores/alerts.store";

type Feedback = {
  intent: Intent;
  message: string;
};

type FeedbackInput =
  | {
      basedOn: "status";
      map: Record<number, Feedback>;
    }
  | {
      basedOn: "outcome";
      map: Partial<Record<"success" | "rejection", Feedback>>;
    };

export function useFetch({
  fetcher,
  feedback,
}: { fetcher?: typeof fetch; feedback?: FeedbackInput } = {}) {
  const [loading, setLoading] = useState(false);
  const addAlert = useAlertsStore((state) => state.addAlert);

  const statefulFetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => {
    setLoading(true);
    const res = await (fetcher ?? fetch)(input, init);
    let alert: Feedback | undefined;
    switch (feedback?.basedOn) {
      case "outcome":
        alert = feedback.map[res.ok ? "success" : "rejection"];
        break;
      case "status":
        alert = feedback.map[res.status];
        break;
    }
    if (!res.ok && !alert) {
      alert = { intent: "danger", message: res.statusText };
    }
    if (alert) {
      addAlert(alert);
    }
    setLoading(false);
    return res;
  };

  return [statefulFetch, loading] as const;
}
