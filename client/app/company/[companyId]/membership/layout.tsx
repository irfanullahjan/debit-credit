import Link from "next/link";
import { Button } from "../../../../common/components/reactstrap";
import { fetchServerSide } from "../../../../common/utils/fetchServerSide";
import { MembershipsTable } from "./MembershipsTable";

export default async function CompanyLayout({
  params: { companyId },
  children,
}: any) {
  const memberships = await fetchServerSide(`/company/${companyId}/membership`);
  return (
    <div>
      <h1>Memberships</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        }}
      >
        <MembershipsTable memberships={memberships} />
        {children}
      </div>
      <Link href={`/company/${companyId}/membership/add`}>
        <Button>Add Membership</Button>
      </Link>
    </div>
  );
}
