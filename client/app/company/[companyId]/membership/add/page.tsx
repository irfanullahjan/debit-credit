import { Card, CardBody, CardHeader } from "~/common/components/reactstrap";
import { MembershipForm } from "../MembershipForm";

export default function AddMembership({ params: { companyId } }: any) {
  return (
    <Card color="light">
      <CardHeader>Add membership</CardHeader>
      <CardBody>
        <MembershipForm companyId={companyId} />
      </CardBody>
    </Card>
  );
}
