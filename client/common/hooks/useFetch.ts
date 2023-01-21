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

type FeedbackMap = Record<number, Feedback>;

export function useFetch(fetcher?: typeof fetch, feedbackMap?: FeedbackMap) {
  const [loading, setLoading] = useState(false);
  const addAlert = useAlertsStore((state) => state.addAlert);

  const fetchWithAlerts = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => {
    setLoading(true);
    const res = await (fetcher ?? fetch)(input, init);
    if (!res.ok) {
      addAlert(
        feedbackMap?.[res.status] ?? {
          intent: Intent.DANGER,
          message: res.statusText,
        }
      );
    } else if (feedbackMap?.[res.status]) {
      addAlert(feedbackMap[res.status]);
    }
    setLoading(false);
    return res;
  };

  return [fetchWithAlerts, loading] as const;
}
