import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavItem, NavLink } from "reactstrap";

type NavLinksProps = {
  links: {
    href: string;
    label: string;
  }[];
};

export function NavLinks(props: NavLinksProps) {
  const { links } = props;
  const pathname = usePathname();
  return (
    <React.Fragment>
      {links.map(({ href, label }) => (
        <NavItem key={href}>
          <NavLink href={href} tag={Link} active={pathname?.indexOf(href) === 0}>
            {label}
          </NavLink>
        </NavItem>
      ))}
    </React.Fragment>
  );
}
