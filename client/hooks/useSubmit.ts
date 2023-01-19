import { useState } from "react";

type Feedback = {
  intent: "success" | "warning" | "danger" | "info";
  message: string;
};

type FeedbackMap = Record<number, Feedback>;

export function useSubmit(fetcher?: typeof fetch, feedbackMap?: FeedbackMap) {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>();

  const submit = async (input: RequestInfo | URL, init?: RequestInit) => {
    setSubmitting(true);
    const res = await (fetcher ?? fetch)(input, init);
    if (!res.ok) {
      setFeedback(
        feedbackMap?.[res.status] ?? {
          intent: "danger",
          message: res.statusText,
        }
      );
    } else {
      setFeedback(feedbackMap?.[res.status]);
    }
    setSubmitting(false);
    return res;
  };

  return {
    submit,
    submitting,
    feedback,
  };
}
