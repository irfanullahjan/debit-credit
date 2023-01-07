import Link from "next/link";

export default function Layout(props: any) {
  const { children } = props;
  return (
    <div>
      <h1>Transactions</h1>
      <Link href="/transactions/add">Add Transaction</Link>
      {children}
    </div>
  );
}
