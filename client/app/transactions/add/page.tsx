import { fetchServerSide } from "../../../common/utils/fetchServerSide";
import { AddTransactionForm } from "./AddTransactionForm";

export default async function AddTransactionPage() {
  const accounts = await fetchServerSide("/company/account");
  return (
    <div>
      <AddTransactionForm accounts={accounts} />
    </div>
  );
}
