"use client";

import { BASE_URL_BACKEND } from "@/common/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Collapse, Nav, NavbarText, NavbarToggler, NavLink } from "reactstrap";
import { LinkType, NavLinks } from "./NavLinks";

export function NavbarCollapse({
  links,
  user,
}: {
  links: LinkType[];
  user: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
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
                fetch(`${BASE_URL_BACKEND}/auth/logout`, {
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
    </>
  );
}
