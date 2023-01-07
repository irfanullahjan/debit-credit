import { Table } from "@/components/reactstrap";

export default async function Account({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(`http://localhost:3001/account/${id}`);
  const account = await data.json();
  return (
    <div>
      <h1>{account.name}</h1>
      <Table>
        <tbody>
          {account.entries.map((entry: any) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>{entry.transaction.description}</td>
              <td>{entry.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th />
            <th>Total</th>
            <th />
            <th>
              {account.entries
                .reduce((sum: number, entry: any) => sum + +entry.amount, 0)
                .toFixed(2)}
            </th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
