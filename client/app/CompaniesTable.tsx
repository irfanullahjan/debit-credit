"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Table } from "~/common/components/reactstrap";
import { useFetch } from "~/common/hooks/useFetch";

export function CompaniesTable({ companies, user }: any) {
  const router = useRouter();
  const [submit] = useFetch();
  const isUserOwner = (company: any) =>
    user.memberships.find(
      (membership: any) =>
        membership.companyId === company.id && membership.role === "owner"
    );
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Company Name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {companies.map((company: any) => (
          <tr key={company.id}>
            <td>{company.id}</td>
            <td>
              <Link key={company.id} href={`/company/${company.id}/account`}>
                {company.name}
              </Link>
            </td>
            <td>
              {isUserOwner(company) && (
                <i
                  className="bi bi-trash3 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this company?\nThe entity will be deleted but can be restored by database administrators."
                      )
                    ) {
                      submit(`/company/${company.id}`, {
                        method: "DELETE",
                      }).then(() => {
                        router.refresh();
                      });
                    }
                  }}
                ></i>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
