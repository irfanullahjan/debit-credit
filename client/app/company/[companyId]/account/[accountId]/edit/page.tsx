import { MetaInfo } from "~/common/components/MetaInfo";
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
  const user = await fetchServerSide(`/auth/current-user`);
  const membership = user.memberships.find(
    (m: any) => m.companyId === Number(companyId)
  );
  const disabled = !["admin", "owner"].includes(membership.role);
  return (
    <Card color="light">
      <CardHeader>Edit Account</CardHeader>
      <CardBody>
        <AccountForm
          companyId={companyId}
          existingData={account}
          disabled={disabled}
        />
        <MetaInfo meta={account.meta} />
      </CardBody>
    </Card>
  );
}
