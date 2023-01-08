import { Table } from "@/components/reactstrap";
import { Realtime } from "@/components/Realtime";
import Link from "next/link";

async function getData() {
  const data = await fetch("http://localhost:3001/transaction");
  return data.json();
}

export default async function TransactionsPage() {
  const transactions = await getData();
  return (
    <div>
      <Realtime />
      <Table>
        <tbody>
          {transactions.map?.((transaction: any) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>
                <Link href={`/transactions/${transaction.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
