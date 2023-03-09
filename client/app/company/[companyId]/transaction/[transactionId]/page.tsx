import { MetaInfo } from "~/common/components/MetaInfo";
import { Card, CardBody, CardHeader } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { TransactionForm } from "../TransactionForm";

export default async function Transaction({
  params: { companyId, transactionId },
}: {
  params: { companyId: string; transactionId: string };
}) {
  const transaction = await fetchServerSide(
    `/company/${companyId}/transaction/${transactionId}`
  );
  const accounts = await fetchServerSide(`/company/${companyId}/account`);
  const user = await fetchServerSide(`/auth/current-user`);
  const membership = user.memberships.find(
    (m: any) => m.company.id === Number(companyId)
  );
  const editDisabled = !["admin", "owner"].includes(membership.role);
  return (
    <Card color="light">
      <CardHeader>Edit transaction</CardHeader>
      <CardBody>
        <TransactionForm
          disabled={editDisabled}
          companyId={companyId}
          accounts={accounts}
          existingData={transaction}
        />
        <MetaInfo meta={transaction.meta} />
      </CardBody>
    </Card>
  );
}
