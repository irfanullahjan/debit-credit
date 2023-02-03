"use client";

import { usePathname, useRouter } from "next/navigation";
import { Table } from "reactstrap";

export function MembershipsTable({ memberships }: { memberships: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const getMembershipPath = (membership: any) =>
    `/company/${membership.companyId}/membership/${membership.id}`;
  return (
    <Table hover>
      <thead>
        <tr>
          <th>User Id</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {memberships.map((membership: any) => (
          <tr
            key={membership.id}
            onClick={() => router.push(getMembershipPath(membership))}
            style={{
              cursor: "pointer",
              backgroundColor:
                pathname === getMembershipPath(membership)
                  ? "#f5f5f5"
                  : undefined,
            }}
          >
            <td>{membership.user.id}</td>
            <td>{membership.user.email}</td>
            <td>{membership.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
