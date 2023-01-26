"use client";

import { usePathname, useRouter } from "next/navigation";
import { Table } from "reactstrap";

export function TransactionsTable({ transactions }: { transactions: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Table hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map?.((transaction: any) => (
          <tr
            key={transaction.id}
            onClick={() => router.push(`/transactions/${transaction.id}`)}
            style={{
              cursor: "pointer",
              backgroundColor:
                pathname === `/transactions/${transaction.id}`
                  ? "#f5f5f5"
                  : undefined,
            }}
          >
            <td>{transaction.id}</td>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
