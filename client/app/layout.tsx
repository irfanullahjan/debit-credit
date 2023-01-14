import "./globals.scss";
import { NavBar } from "../components/NavBar";
import { Main } from "@/components/Main";
import { Realtime } from "@/components/Realtime";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = headers().get("cookie") ?? undefined;
  const user = await fetch("http://localhost:3001/auth/current-user", {
    headers: {
      cookie,
    } as any,
  }).then((res) => res.json());
  console.log(user);
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <p>{user.email}</p>
        <NavBar />
        <Realtime />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
