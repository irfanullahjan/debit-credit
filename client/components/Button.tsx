"use client"

import { Button as ButtonBase, ButtonProps } from "reactstrap";

export function Button(props: ButtonProps) {
  const { children, ...rest } = props;
  return <ButtonBase {...rest}>{children}</ButtonBase>;
}