import Link from "next/link";
import { Button } from "~/common/components/reactstrap";
import { isOwner } from "~/common/utils/auth";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { MembershipsTable } from "./MembershipsTable";

export default async function CompanyLayout({
  params: { companyId },
  children,
}: any) {
  const user = await fetchServerSide("/auth/current-user");
  if (!isOwner(user, companyId)) {
    return "You are not authorized to access this page";
  }

  const memberships = await fetchServerSide(`/company/${companyId}/membership`);

  return (
    <div>
      <div className="d-flex align-items-center">
        <h1 style={{ marginRight: "1rem" }}>Memberships</h1>
        <Link href={`/company/${companyId}/membership/add`}>
          <Button color="primary">
            <i className="bi bi-plus-circle"></i> Add Membership
          </Button>
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        }}
      >
        <MembershipsTable memberships={memberships} />
        {children}
      </div>
    </div>
  );
}
