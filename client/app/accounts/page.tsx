"use client";

import { Table } from "@/components/reactstrap";
import { fetcherJson } from "@/utils/fetcherJson";
import Link from "next/link";
import { useEffect } from "react";
import { io } from "socket.io-client";
import useSWR from "swr";

export default function AccountsPage() {
  const { data: accounts, isValidating, mutate } = useSWR(
    "http://localhost:3001/account",
    fetcherJson
  );

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("transaction", () => {
      mutate();
    });
    return () => {
      socket.off("transaction");
    };
  }, [mutate]);

  if (!accounts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>Debit</th>
            <th style={{ textAlign: "right" }}>Credit</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {accounts?.map((account: any) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.name}</td>
              <td style={{ textAlign: "right" }}>
                {account.balanceDebit.toFixed(2)}
              </td>
              <td style={{ textAlign: "right" }}>
                {account.balanceCredit.toFixed(2)}
              </td>
              <td>
                <Link href={`/accounts/${account.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th />
            <th>Total</th>
            <th style={{ textAlign: "right" }}>
              {accounts
                .reduce(
                  (sum: number, account: any) => sum + account.balanceDebit,
                  0
                )
                .toFixed(2)}
            </th>
            <th style={{ textAlign: "right" }}>
              {accounts
                .reduce(
                  (sum: number, account: any) => sum + account.balanceCredit,
                  0
                )
                .toFixed(2)}
            </th>
            <th />
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
