import Link from "next/link";

export default function Layout(props: any) {
  const { children } = props;
  return (
    <div>
      <h1>Accounts</h1>
      <Link href="/accounts/add">Add Account</Link>
      {children}
    </div>
  );
}
