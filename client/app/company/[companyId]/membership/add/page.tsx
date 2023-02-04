import { MembershipForm } from "../MembershipForm";

export default function AddMembership({ params: { companyId } }: any) {
  return (
    <div className="rounded shadow overflow-hidden">
      <MembershipForm companyId={companyId} />
    </div>
  );
}
