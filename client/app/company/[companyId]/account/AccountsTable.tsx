"use client";

import { sum } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { Table } from "reactstrap";
import { decimalTwoPlaces } from "~/common/utils/numberUtils";

export function AccountsTable({ accounts, companyId, user }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const getAccountPath = (account: any) =>
    `/company/${account.companyId}/account/${account.id}`;
  const membership = user.memberships.find(
    (m: any) => m.company.id === Number(companyId)
  );
  const editDisabled = !["admin", "owner"].includes(membership.role);
  return (
    <div>
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
              <td>{account.id} </td>
              <td>
                {account.name}{" "}
                {!editDisabled && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`${getAccountPath(account)}/edit`);
                    }}
                  >
                    <i className="bi bi-pencil text-primary"></i>
                  </span>
                )}
              </td>
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
              {decimalTwoPlaces(sum(accounts.map((a: any) => a.balanceDebit)))}
            </th>
            <th style={{ textAlign: "right" }}>
              {decimalTwoPlaces(sum(accounts.map((a: any) => a.balanceCredit)))}
            </th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
