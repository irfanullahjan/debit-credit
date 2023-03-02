"use client";

import { Card, CardBody, CardHeader } from "~/common/components/reactstrap";
import { AccountForm } from "../AccountForm";

export default function AccountAddPage({ params: { companyId } }: any) {
  return (
    <Card color="light">
      <CardHeader>Add Account</CardHeader>
      <CardBody>
        <AccountForm companyId={companyId} />
      </CardBody>
    </Card>
  );
}
