import { create } from "zustand";

export enum Intent {
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

export interface IAlert {
  id: number;
  intent: Intent;
  message: string;
}

interface IAlertsStore {
  alerts: IAlert[];
  addAlert: (alert: Omit<IAlert, "id">) => void;
  removeAlert: (alert: number) => void;
}

export const useAlertsStore = create<IAlertsStore>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, { ...alert, id: Date.now() }],
    })),
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
}));
