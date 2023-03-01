import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { AccountsTable } from "./AccountsTable";

export default async function Layout(props: any) {
  const {
    children,
    params: { companyId },
  } = props;
  const user = await fetchServerSide("/auth/current-user");
  if (!user?.id) {
    redirect("/user/login");
  }
  const accounts = await fetchServerSide(`/company/${companyId}/account`);
  return (
    <div>
      <div className="d-flex align-items-center">
        <h1 style={{ marginRight: "1rem" }}>Accounts</h1>
        <Link href={`/company/${companyId}/account/add`}>
          <Button color="primary">
            <i className="bi bi-plus-circle"></i> Add Account
          </Button>
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        }}
      >
        <AccountsTable accounts={accounts} />
        {children}
      </div>
    </div>
  );
}
