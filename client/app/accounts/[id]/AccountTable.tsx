"use client";

import { useRouter } from "next/navigation";
import { Table } from "reactstrap";
import { decimalTwoPlaces } from "../../../common/utils/numberUtils";

export function AccountTable({ account }: { account: any }) {
  const router = useRouter();
  return (
    <Table hover>
      <thead className="bg-secondary text-white">
        <tr>
          <th>Entry Id</th>
          <th>Date</th>
          <th>Description</th>
          <th style={{ textAlign: "right" }}>Debit</th>
          <th style={{ textAlign: "right" }}>Credit</th>
        </tr>
      </thead>
      <tbody>
        {account.entries.map((entry: any) => (
          <tr
            key={entry.id}
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/transactions/${entry.transactionId}`)}
          >
            <td>{entry.id}</td>
            <td>{entry.date}</td>
            <td>{entry.transaction.description}</td>
            <td style={{ textAlign: "right" }}>
              {decimalTwoPlaces(entry.amountDebit)}
            </td>
            <td style={{ textAlign: "right" }}>
              {decimalTwoPlaces(entry.amountCredit)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th />
          <th />
          <th>Net balance</th>
          <th style={{ textAlign: "right" }}>
            {decimalTwoPlaces(account.balanceDebit)}
          </th>
          <th style={{ textAlign: "right" }}>
            {decimalTwoPlaces(account.balanceCredit)}
          </th>
        </tr>
      </tfoot>
    </Table>
  );
}
