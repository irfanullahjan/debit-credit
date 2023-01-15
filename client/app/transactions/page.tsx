import { Table } from "@/components/reactstrap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Link from "next/link";
import { BASE_URL_BACKEND } from "../common/constants";

export default async function TransactionsPage() {
  const transactions = await fetchWithAuth(`${BASE_URL_BACKEND}/ledger/transaction`);
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
