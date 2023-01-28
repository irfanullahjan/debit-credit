import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../../common/components/reactstrap";
import { fetchServerSide } from "../../common/utils/fetchServerSide";
import { TransactionsTable } from "./TransactionsTable";

export default async function Layout(props: any) {
  const { children } = props;
  const user = await fetchServerSide("/auth/current-user");
  if (!user?.userId) {
    redirect("/user/login");
  }
  const transactions = await fetchServerSide("/company/transaction");
  return (
    <div>
      <h1>Transactions</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        }}
      >
        <TransactionsTable transactions={transactions} />
        {children}
      </div>
      <Link href="/transactions/add">
        <Button>Add Transaction</Button>
      </Link>
    </div>
  );
}
