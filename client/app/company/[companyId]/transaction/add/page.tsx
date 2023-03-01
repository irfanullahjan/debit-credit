import { Card, CardBody, CardHeader } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { TransactionForm } from "./TransactionForm";

export default async function AddTransactionPage({ params }: any) {
  const accounts = await fetchServerSide(
    `/company/${params.companyId}/account`
  );
  return (
    <Card className="my-2" color="light">
      <CardHeader>Add transaction</CardHeader>
      <CardBody>
        <TransactionForm accounts={accounts} companyId={params.companyId} />
      </CardBody>
    </Card>
  );
}
