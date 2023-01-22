import { fetchServerSide } from "../utils/fetchServerSide";
import { Alerts } from "./components/Alerts";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";
import { Realtime } from "./components/Realtime";

import "./globals.scss";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchServerSide("/auth/current-user");
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navbar user={user} />
        <Alerts />
        <Realtime />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
