import { Table } from "@/components/reactstrap";
import Link from "next/link";

async function getData() {
  const data = await fetch("http://localhost:3001/account");
  return data.json();
}

export default async function AccountsPage() {
  const accounts = await getData();

  return (
    <div>
      <h1>Accounts</h1>
      <Link href="/accounts/add">Add Account</Link>
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
