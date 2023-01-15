import { Table } from "@/app/components/reactstrap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Link from "next/link";
import { BASE_URL_BACKEND } from "../../common/constants";

export default async function AccountsPage() {
  const accounts = await fetchWithAuth(`${BASE_URL_BACKEND}/ledger/account`);
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
          {accounts.map((account: any) => (
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
