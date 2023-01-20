import "./globals.scss";
import { Navbar } from "./components/Navbar";
import { Main } from "@/app/components/Main";
import { Realtime } from "@/app/components/Realtime";
import { fetchServerSide } from "@/utils/fetchServerSide";
import { useAlertsStore } from "@/common/stores/alerts.store";
import { Alert } from "@/app/components/reactstrap";
import { Alerts } from "./components/Alerts";

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
