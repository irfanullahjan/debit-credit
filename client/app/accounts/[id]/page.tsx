import { Table } from "@/components/reactstrap";
import Link from "next/link";

export default async function Account({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(`http://localhost:3001/account/${id}`);
  const account = await data.json();
  return (
    <div>
      <h1>{account.name}</h1>
      <Table>
        <thead>
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
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>
                <Link href={`/transactions/${entry.transaction.id}`}>
                  {entry.transaction.description}
                </Link>
              </td>
              <td style={{ textAlign: "right" }}>
                {(+entry.amountDebit).toFixed(2)}
              </td>
              <td style={{ textAlign: "right" }}>
                {(+entry.amountCredit).toFixed(2)}
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
              {account.balanceDebit.toFixed(2)}
            </th>
            <th style={{ textAlign: "right" }}>
              {account.balanceCredit.toFixed(2)}
            </th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
