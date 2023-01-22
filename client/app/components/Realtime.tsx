"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function Realtime() {
  const { refresh } = useRouter();

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("transaction", () => {
      refresh();
    });
    return () => {
      socket.off("transaction");
    };
  }, [refresh]);

  return null;
}
