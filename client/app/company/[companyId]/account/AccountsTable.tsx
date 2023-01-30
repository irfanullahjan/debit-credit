"use client";

import { sum } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { Table } from "reactstrap";
import { decimalTwoPlaces } from "../../../../common/utils/numberUtils";

export function AccountsTable({ accounts }: { accounts: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const getAccountPath = (account: any) =>
    `/company/${account.companyId}/account/${account.id}`;
  return (
    <Table hover>
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
            onClick={() => router.push(getAccountPath(account))}
            style={{
              cursor: "pointer",
              backgroundColor:
                pathname === getAccountPath(account) ? "#f5f5f5" : undefined,
            }}
          >
            <td>{account.id}</td>
            <td>{account.name}</td>
            <td style={{ textAlign: "right" }}>
              {decimalTwoPlaces(account.balanceDebit)}
            </td>
            <td style={{ textAlign: "right" }}>
              {decimalTwoPlaces(account.balanceCredit)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th />
          <th>Total</th>
          <th style={{ textAlign: "right" }}>
            {decimalTwoPlaces(sum(accounts.map((a) => a.balanceDebit)))}
          </th>
          <th style={{ textAlign: "right" }}>
            {decimalTwoPlaces(sum(accounts.map((a) => a.balanceCredit)))}
          </th>
        </tr>
      </tfoot>
    </Table>
  );
}
