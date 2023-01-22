import { fetchServerSide } from "../../../utils/fetchServerSide";
import { AddTransactionForm } from "./AddTransactionForm";

export default async function AddTransactionPage() {
  const accounts = await fetchServerSide("/ledger/account");
  return (
    <div>
      <AddTransactionForm accounts={accounts} />
    </div>
  );
}
