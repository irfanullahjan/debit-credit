import { fetchServerSide } from "../../../../../common/utils/fetchServerSide";
import { TransactionTable } from "./TransactionTable";

export default async function Transaction({
  params: { companyId, transactionId },
}: {
  params: { companyId: string; transactionId: string };
}) {
  const transaction = await fetchServerSide(
    `/company/${companyId}/transaction/${transactionId}`
  );
  return (
    <div className="rounded shadow overflow-hidden">
      <TransactionTable transaction={transaction} />
    </div>
  );
}
