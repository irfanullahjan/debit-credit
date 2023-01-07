"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  Row,
} from "reactstrap";
import { NavLinks } from "./NavLinks";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/accounts", label: "Accounts" },
    { href: "/transactions", label: "Transactions" },
  ];

  return (
    <div className="bg-dark">
      <Container>
        <Row>
          <Col>
            <Navbar dark color="dark" expand="md">
              <NavbarBrand href="/" tag={Link}>DebitCredit</NavbarBrand>
              <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                  <NavLinks links={links} />
                </Nav>
                <NavbarText>Simple Text</NavbarText>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
