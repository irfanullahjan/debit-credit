import "./globals.scss";
import NextLink from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <nav>
          <NextLink href="/">Home</NextLink>
          <NextLink href="/ledger">Ledger</NextLink>
          <NextLink href="/accounts">Accounts</NextLink>
        </nav>
        {children}
      </body>
    </html>
  );
}
