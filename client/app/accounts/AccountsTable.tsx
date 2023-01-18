"use client";

import { usePathname, useRouter } from "next/navigation";
import { Table } from "reactstrap";

export function AccountsTable({ accounts }: { accounts: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th style={{ textAlign: "right" }}>Debit</th>
          <th style={{ textAlign: "right" }}>Credit</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account: any) => (
          <tr
            key={account.id}
            onClick={() => router.push(`/accounts/${account.id}`)}
            style={{ cursor: "pointer" }}
            className={
              pathname?.indexOf(`/accounts/${account.id}`) === 0
                ? "bg-secondary text-white"
                : ""
            }
          >
            <td>{account.id}</td>
            <td>{account.name}</td>
            <td style={{ textAlign: "right" }}>
              {account.balanceDebit.toFixed(2)}
            </td>
            <td style={{ textAlign: "right" }}>
              {account.balanceCredit.toFixed(2)}
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
        </tr>
      </tfoot>
    </Table>
  );
}
