import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { Ledger } from "./Ledger";

export default async function LedgerPage({ params: { companyId } }: any) {
  const accounts = await fetchServerSide(`/company/${companyId}/account`);
  return <Ledger companyId={companyId} accounts={accounts} />;
}
