"use client";

import { useState } from "react";
import { Collapse, Nav, NavbarText, NavbarToggler } from "reactstrap";
import { LinkType, NavLinks } from "./NavLinks";

export function NavbarCollapse({ links, user }: { links: LinkType[], user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavLinks links={links} />
        </Nav>
      </Collapse>
      <NavbarText>{user.email}</NavbarText>
    </>
  );
}
