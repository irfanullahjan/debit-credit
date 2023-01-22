import Link from "next/link";
import { fetchServerSide } from "../../utils/fetchServerSide";
import { AccountsTable } from "./AccountsTable";

export default async function Layout(props: any) {
  const { children } = props;
  const accounts = await fetchServerSide("/ledger/account");
  return (
    <div>
      <h1>Accounts</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        }}
      >
        <AccountsTable accounts={accounts} />
        {children}
      </div>
      <Link href="/accounts/add">Add Account</Link>
    </div>
  );
}
