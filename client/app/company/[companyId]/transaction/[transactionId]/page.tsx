import { Card, CardBody, CardHeader } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { TransactionForm } from "../add/TransactionForm";

export default async function Transaction({
  params: { companyId, transactionId },
}: {
  params: { companyId: string; transactionId: string };
}) {
  const transaction = await fetchServerSide(
    `/company/${companyId}/transaction/${transactionId}`
  );
  const accounts = await fetchServerSide(`/company/${companyId}/account`);
  return (
    <Card color="light">
      <CardHeader>Edit transaction</CardHeader>
      <CardBody>
        <TransactionForm
          companyId={companyId}
          accounts={accounts}
          existingData={transaction}
        />
        <div className="my-3">
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
      </CardBody>
    </Card>
  );
}
