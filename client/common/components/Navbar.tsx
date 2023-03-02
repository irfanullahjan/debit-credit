"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { NavbarCollapse } from "./NavbarCollapse";
import {
  Col,
  Container,
  Navbar as ReactstrapNavbar,
  NavbarBrand,
  Row,
} from "./reactstrap";

export function Navbar({ user }: any) {
  const companyId = parseInt(useSelectedLayoutSegments()?.[1]);
  const companyName = user.memberships.find(
    (membership: any) => membership.companyId === companyId
  )?.company.name;
  return (
    <div className="bg-dark">
      <Container>
        <Row>
          <Col>
            <ReactstrapNavbar dark color="dark" expand="sm">
              <NavbarBrand href="/" tag={Link}>
                DebitCredit
                {companyName && (
                  <>
                    <span className="text-muted">/</span>
                    <span className="text-primary">{companyName}</span>
                  </>
                )}
              </NavbarBrand>
              <NavbarCollapse user={user} />
            </ReactstrapNavbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
