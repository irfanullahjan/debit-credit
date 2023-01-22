import Link from "next/link";
import { fetchServerSide } from "../../../utils/fetchServerSide";
import { Table } from "../../components/reactstrap";

export default async function Account({ params }: { params: { id: number } }) {
  const { id } = params;
  const account = await fetchServerSide(`/ledger/account/${id}`);
  return (
    <div className="rounded shadow">
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
