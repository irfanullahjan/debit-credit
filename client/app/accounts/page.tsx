import { Button } from "@/components/Button";

async function getData() {
  const data = await fetch("http://localhost:3001/account");
  return data.json();
}

export default async function AccountsPage() {
  const accounts = await getData();
  return (
    <div>
      <h1>Accounts</h1>
      <Button>dddd</Button>
      {accounts.map((account: any) => (
        <div key={account.id}>
          {Object.entries(account).map(([key, value]) => (
            <div key={key}>{`${key}: ${value}`}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
