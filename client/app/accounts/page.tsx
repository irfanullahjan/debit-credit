import { Table } from "@/components/reactstrap";

async function getData() {
  const data = await fetch("http://localhost:3001/account");
  return data.json();
}

export default async function AccountsPage() {
  const accounts = await getData();
  return (
    <div>
      <h1>Accounts</h1>
      <Table>
        {accounts.map((account: any) => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.name}</td>
            <td>{account.balance}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
