"use client";

import { useAlertsStore } from "@/common/stores/alerts.store";
import { Alert as RsAlert } from "@/app/components/reactstrap";
import styles from "./Alerts.module.scss";
import { AlertProps } from "reactstrap";
import { useEffect } from "react";
import { ALERT_TIMEOUT } from "@/common/constants";

export function Alerts() {
  const { alerts, removeAlert } = useAlertsStore((store) => ({
    alerts: store.alerts,
    removeAlert: store.removeAlert,
  }));

  return (
    <div className={styles.Alerts}>
      {alerts.map((alert) => (
        <Alert
          id={alert.id}
          key={alert.id}
          color={alert.intent}
          toggle={() => removeAlert(alert.id)}
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}

function Alert(props: AlertProps & { id: string }) {
  const removeAlert = useAlertsStore((store) => store.removeAlert);

  useEffect(() => {
    const timeout = setTimeout(() => removeAlert(props.id), ALERT_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [props.id, removeAlert]);

  return <RsAlert {...props} />;
}
