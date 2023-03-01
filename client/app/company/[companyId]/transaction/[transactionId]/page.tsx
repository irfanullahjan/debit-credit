import { fetchServerSide } from "~/common/utils/fetchServerSide";
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
      <div className="m-3">
        <small className="text-muted">
          Created by {transaction.meta.createdByUser.email} on{" "}
          {new Date(transaction.meta.createdAt).toLocaleString()}
        </small>
        <br />
        <small className="text-muted">
          Last updated by {transaction.meta.updatedByUser.email} on{" "}
          {new Date(transaction.meta.updatedAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
}
