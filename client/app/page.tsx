import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Table } from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { CompaniesTable } from "./CompaniesTable";

export default async function Home() {
  const user = await fetchServerSide("/auth/current-user");
  if (!user?.id) {
    redirect("/user/login");
  }
  const companies = await fetchServerSide("/company");
  return (
    <>
      <div>
        <div className="d-flex align-items-center">
          <h1 style={{ marginRight: "1rem" }}>My Companies</h1>
          <Link href="/company/add">
            <Button color="primary">
              <i className="bi bi-plus-circle"></i> Add Company
            </Button>
          </Link>
        </div>
        <p className="lead">
          {companies.length === 0
            ? "You have zero companies, please create one or request to join an existing company"
            : "Select a company to view its accounts and transactions"}
        </p>
      </div>
      <CompaniesTable companies={companies} user={user} />
    </>
  );
}
