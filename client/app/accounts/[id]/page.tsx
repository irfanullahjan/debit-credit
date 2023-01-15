import { BASE_URL_BACKEND } from "@/common/constants";
import { Table } from "@/components/reactstrap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Link from "next/link";

export default async function Account({ params }: { params: { id: number } }) {
  const { id } = params;
  const account = await fetchWithAuth(`${BASE_URL_BACKEND}/ledger/account/${id}`);
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
