import { useState } from "react";
import { useAlertsStore } from "../stores/alerts.store";

export enum Intent {
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

type Feedback = {
  intent: Intent;
  message: string;
};

export enum FeedbackBasis {
  STATUS = "status",
  OUTCOME = "outcome",
}

enum Outcome {
  SUCCESS = "success",
  REJECTION = "rejection",
}

type FeedbackInput =
  | {
      basedOn: FeedbackBasis.STATUS;
      map: Record<number, Feedback>;
    }
  | {
      basedOn: FeedbackBasis.OUTCOME;
      map: Partial<Record<Outcome, Feedback>>;
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
      case FeedbackBasis.OUTCOME:
        alert = feedback.map[res.ok ? Outcome.SUCCESS : Outcome.REJECTION];
        break;
      case FeedbackBasis.STATUS:
        alert = feedback.map[res.status];
        break;
    }
    if (!res.ok && !alert) {
      alert = { intent: Intent.DANGER, message: res.statusText };
    }
    if (alert) {
      addAlert(alert);
    }
    setLoading(false);
    return res;
  };

  return [statefulFetch, loading] as const;
}
