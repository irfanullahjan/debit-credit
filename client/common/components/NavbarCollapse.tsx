"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import { Collapse, Nav, NavbarText, NavbarToggler, NavLink } from "reactstrap";
import { useFetch } from "../hooks/useFetch";
import { isOwner } from "../utils/auth";
import { NavLinks } from "./NavLinks";

export function NavbarCollapse({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const companyId = parseInt(useSelectedLayoutSegments()[1]);

  const links = companyId
    ? [
        {
          href: `/company/${companyId}/account`,
          label: "Accounts",
        },
        {
          href: `/company/${companyId}/transaction`,
          label: "Transactions",
        },
        {
          href: `/company/${companyId}/ledger`,
          label: "Ledger",
        },
      ]
    : [];

  if (isOwner(user, companyId)) {
    links.push({
      href: `/company/${companyId}/membership`,
      label: "Memberships",
    });
  }

  const [submit] = useFetch();
  return (
    <>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavLinks links={links} />
        </Nav>
      </Collapse>
      {user && user.email ? (
        <>
          <NavbarText>{user.email}</NavbarText>
          <Nav className="me-auto" navbar>
            <NavLink
              onClick={() => {
                if (confirm("Are you sure you want to logout?")) {
                  submit("/auth/logout", {
                    method: "POST",
                    feedback: {
                      basedOn: "outcome",
                      map: {
                        success: {
                          message: "Logout successful",
                          intent: "success",
                        },
                      },
                    },
                  }).then(() => {
                    router.push("/");
                    router.refresh();
                  });
                }
              }}
              style={{ cursor: "pointer" }}
            >
              Logout
            </NavLink>
          </Nav>
        </>
      ) : (
        <Nav className="me-auto" navbar>
          <NavLinks
            links={[
              { href: "/user/login", label: "Login" },
              { href: "/user/signup", label: "Signup" },
            ]}
          />
        </Nav>
      )}
    </>
  );
}
