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

export function useSubmit(fetcher?: typeof fetch, feedbackMap?: FeedbackMap) {
  const [submitting, setSubmitting] = useState(false);
  const addAlert = useAlertsStore((state) => state.addAlert);

  const submit = async (input: RequestInfo | URL, init?: RequestInit) => {
    setSubmitting(true);
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
    setSubmitting(false);
    return res;
  };

  return {
    submit,
    submitting,
  };
}
