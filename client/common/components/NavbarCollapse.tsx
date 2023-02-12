"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavbarText,
  NavbarToggler,
  NavLink,
} from "reactstrap";
import { useFetch } from "../hooks/useFetch";
import { isOwner } from "../utils/auth";
import { NavLinks } from "./NavLinks";

export function NavbarCollapse({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
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

  const [submit] = useFetch({
    feedback: {
      basedOn: "outcome",
      map: {
        success: {
          message: "Logout successful",
          intent: "success",
        },
      },
    },
  });
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
              onClick={() =>
                submit("/auth/logout", {
                  method: "POST",
                }).then(() => {
                  router.push("/");
                  router.refresh();
                })
              }
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
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Dropdown</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => router.push("/company/add")}>
            Create new
          </DropdownItem>
          {user?.memberships.map((membership: any, i: number) => (
            <DropdownItem
              key={i}
              active={companyId === membership.company.id}
              onClick={() => router.push(`/company/${membership.company.id}`)}
            >
              {membership.company.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
