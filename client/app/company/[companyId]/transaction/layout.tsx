import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { TransactionsTable } from "./TransactionsTable";

export default async function Layout(props: any) {
  const { children, params } = props;
  const user = await fetchServerSide("/auth/current-user");
  if (!user?.id) {
    redirect("/user/login");
  }
  const transactions = await fetchServerSide(
    `/company/${params.companyId}/transaction`
  );
  return (
    <div>
      <div className="d-flex align-items-center">
        <h1 style={{ marginRight: "1rem" }}>Transactions</h1>
        <Link href={`/company/${params.companyId}/transaction/add`}>
          <Button color="primary">
            <i className="bi bi-plus-circle"></i> Add Transaction
          </Button>
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        }}
      >
        {transactions?.length === 0 ? (
          <p>
            No transactions found, please start by creating a transaction
            transactions
          </p>
        ) : (
          <TransactionsTable transactions={transactions} />
        )}
        {children}
      </div>
    </div>
  );
}
