import { fetchServerSide } from "../../../../../common/utils/fetchServerSide";
import { AddTransactionForm } from "./AddTransactionForm";

export default async function AddTransactionPage({ params }: any) {
  const accounts = await fetchServerSide(
    `/company/${params.companyId}/account`
  );
  return (
    <div>
      <AddTransactionForm accounts={accounts} companyId={params.companyId} />
    </div>
  );
}
