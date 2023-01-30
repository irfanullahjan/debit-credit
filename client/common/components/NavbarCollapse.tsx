"use client";

import { useRouter } from "next/navigation";
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
import { useUserStore } from "../stores/user.store";
import { NavLinks } from "./NavLinks";

export function NavbarCollapse({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const router = useRouter();

  const { selectedCompanyId, selectCompany } = useUserStore((state) => ({
    selectedCompanyId: state.selectedCompanyId,
    selectCompany: state.selectCompany,
  }));

  const links = selectedCompanyId
    ? [
        {
          href: `/company/${selectedCompanyId}/account`,
          label: "Accounts",
        },
        {
          href: `/company/${selectedCompanyId}/transaction`,
          label: "Transactions",
        },
      ]
    : [];

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
          {user.memberships.map((membership: any, i: number) => (
            <DropdownItem
              key={i}
              active={selectedCompanyId === membership.company.id}
              onClick={() => selectCompany(membership.company.id)}
            >
              {membership.company.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
