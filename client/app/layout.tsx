import "./globals.scss";
import { NavBar } from "../components/NavBar";
import { Main } from "@/components/Main";
import { Realtime } from "@/components/Realtime";

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
        <NavBar />
        <Realtime />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
