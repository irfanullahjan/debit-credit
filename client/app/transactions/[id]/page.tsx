import { Table } from "@/components/reactstrap";
import Link from "next/link";

export default async function Transaction({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await fetch(`http://localhost:3001/transaction/${id}`);
  const transaction = await data.json();
  return (
    <div>
      <h1>
        Transaction {id}: {transaction.description}
      </h1>
      <Table>
        <thead>
          <tr>
            <th>Entry ID</th>
            <th>Date</th>
            <th>Account</th>
            <th style={{ textAlign: "right" }}>Debit</th>
            <th style={{ textAlign: "right" }}>Credit</th>
          </tr>
        </thead>
        <tbody>
          {transaction.entries.map((entry: any) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>
                <Link href={`/accounts/${entry.account.id}`}>
                  {entry.account.name}
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
      </Table>
    </div>
  );
}
