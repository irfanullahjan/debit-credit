import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../../common/components/reactstrap";
import { fetchServerSide } from "../../common/utils/fetchServerSide";

export default async function Layout(props: any) {
  const { children } = props;
  const user = await fetchServerSide("/auth/current-user");
  if (!user?.userId) {
    redirect("/user/login");
  }
  return (
    <div>
      <h1>Transactions</h1>
      <Link href="/transactions/add">
        <Button>Add Transaction</Button>
      </Link>
      {children}
    </div>
  );
}
