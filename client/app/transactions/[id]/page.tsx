import { fetchServerSide } from "../../../common/utils/fetchServerSide";
import { TransactionTable } from "./TransactionTable";

export default async function Transaction({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const transaction = await fetchServerSide(`/company/transaction/${id}`);
  return (
    <div className="rounded shadow overflow-hidden">
      <TransactionTable transaction={transaction} />
    </div>
  );
}
