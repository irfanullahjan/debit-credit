"use client";

import { useRouter } from "next/navigation";
import { Table } from "reactstrap";
import { decimalTwoPlaces } from "~/common/utils/numberUtils";

export function TransactionTable({ transaction }: { transaction: any }) {
  const router = useRouter();
  return (
    <Table hover>
      <thead className="bg-secondary text-white">
        <tr>
          <th>Entry ID</th>
          <th>Date</th>
          <th>Account</th>
          <th style={{ textAlign: "right" }}>Debit</th>
          <th style={{ textAlign: "right" }}>Credit</th>
        </tr>
      </thead>
      <tbody>
        {transaction.entries?.map((entry: any) => (
          <tr
            key={entry.id}
            style={{ cursor: "pointer" }}
            onClick={() =>
              router.push(
                `/company/${entry.companyId}/account/${entry.accountId}`
              )
            }
          >
            <td>{entry.id}</td>
            <td>{entry.date}</td>
            <td>{entry.account.name}</td>
            <td style={{ textAlign: "right" }}>
              {decimalTwoPlaces(entry.amountDebit)}
            </td>
            <td style={{ textAlign: "right" }}>
              {decimalTwoPlaces(entry.amountCredit)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
