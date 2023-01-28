import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button } from "../../common/components/reactstrap";
import { fetchServerSide } from "../../common/utils/fetchServerSide";
import { AccountsTable } from "./AccountsTable";

export default async function Layout(props: any) {
  const { children } = props;
  const user = await fetchServerSide("/auth/current-user");
  if (!user?.userId) {
    redirect("/user/login");
  }
  const accounts = await fetchServerSide("/company/account");
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
      <Link href="/accounts/add">
        <Button>Add Account</Button>
      </Link>
    </div>
  );
}
