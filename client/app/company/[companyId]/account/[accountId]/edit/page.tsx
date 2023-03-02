import { Card, CardBody, CardHeader } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { AccountForm } from "../../AccountForm";

export default async function EditAccount({
  params: { companyId, accountId },
}: {
  params: { companyId: number; accountId: number };
}) {
  const account = await fetchServerSide(
    `/company/${companyId}/account/${accountId}`
  );
  return (
    <Card color="light">
      <CardHeader>Edit Account</CardHeader>
      <CardBody>
        <AccountForm companyId={companyId} existingData={account} />
      </CardBody>
    </Card>
  );
}
