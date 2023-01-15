import Link from "next/link";
import {
  Col,
  Container,
  Navbar,
  NavbarBrand,
  Row,
} from "@/components/reactstrap";
import { NavbarCollapse } from "./NavbarCollapse";
import { LinkType } from "./NavLinks";

export function NavBar({ user }: { user: object }) {
  const links: LinkType[] = [
    { href: "/accounts", label: "Accounts" },
    { href: "/transactions", label: "Transactions" },
  ];

  return (
    <div className="bg-dark">
      <Container>
        <Row>
          <Col>
            <Navbar dark color="dark" expand="sm">
              <NavbarBrand href="/" tag={Link}>
                DebitCredit
              </NavbarBrand>
              <NavbarCollapse links={links} user={user} />
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
