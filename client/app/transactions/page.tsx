import Link from "next/link";
import { fetchServerSide } from "../../utils/fetchServerSide";
import { Table } from "../components/reactstrap";

export default async function TransactionsPage() {
  const transactions = await fetchServerSide("/ledger/transaction");
  return (
    <div>
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
