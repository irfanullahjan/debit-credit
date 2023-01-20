"use client";

import { useAlertsStore } from "@/common/stores/alerts.store";
import { Alert } from "reactstrap";

export function Alerts() {
  const { alerts, removeAlert } = useAlertsStore((store) => ({
    alerts: store.alerts,
    removeAlert: store.removeAlert,
  }));

  return (
    <>
      {alerts.map((alert) => (
        <Alert key={alert.id} color={alert.intent} toggle={() => removeAlert(alert.id)}> 
          {alert.message}
        </Alert>
      ))}
    </>
  );
}
