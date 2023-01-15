import "./globals.scss";
import { NavBar } from "../components/NavBar";
import { Main } from "@/components/Main";
import { Realtime } from "@/components/Realtime";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchWithAuth("http://localhost:3001/auth/current-user");
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <NavBar user={user} />
        <Realtime />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
