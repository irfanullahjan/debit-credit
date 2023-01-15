import Link from "next/link";
import {
  Col,
  Container,
  Navbar as ReactstrapNavbar,
  NavbarBrand,
  Row,
} from "@/app/components/reactstrap";
import { NavbarCollapse } from "./NavbarCollapse";
import { LinkType } from "./NavLinks";

export function Navbar({ user }: { user: object }) {
  const links: LinkType[] = [
    { href: "/accounts", label: "Accounts" },
    { href: "/transactions", label: "Transactions" },
  ];

  return (
    <div className="bg-dark">
      <Container>
        <Row>
          <Col>
            <ReactstrapNavbar dark color="dark" expand="sm">
              <NavbarBrand href="/" tag={Link}>
                DebitCredit
              </NavbarBrand>
              <NavbarCollapse links={links} user={user} />
            </ReactstrapNavbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
