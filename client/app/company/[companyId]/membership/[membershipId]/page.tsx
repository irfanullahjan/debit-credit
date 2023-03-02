import { Card, CardBody, CardHeader } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { MembershipForm } from "../MembershipForm";

export default async function Account({
  params: { companyId, membershipId },
}: {
  params: { companyId: number; membershipId: number };
}) {
  const membership = await fetchServerSide(
    `/company/${companyId}/membership/${membershipId}`
  );
  return (
    <Card color="light">
      <CardHeader>Edit membership</CardHeader>
      <CardBody>
        <MembershipForm
          existingData={{
            membershipId: membership.id,
            email: membership.user.email,
            role: membership.role,
          }}
          companyId={companyId}
        />
      </CardBody>
    </Card>
  );
}
