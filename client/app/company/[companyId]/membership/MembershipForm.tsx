"use client";

import { Form, FormikProvider, useFormik } from "formik";
import { Button } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";

export function MembershipForm({
  membershipDto,
  companyId,
}: {
  membershipDto?: {
    membershipId: number;
    email: string;
    role: string;
  };
  companyId: number;
}) {
  const [submit, submitting] = useFetch();
  const formik = useFormik({
    initialValues: membershipDto ?? {
      email: "",
      role: "user",
    },
    onSubmit: async (values) => {
      const membershipId = membershipDto?.membershipId;
      const putSegment = membershipId ? `/${membershipId}` : "";
      submit(`/company/${companyId}/membership${putSegment}`, {
        method: membershipDto ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          role: values.role,
        }),
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <FormikInput name="email" label="Email" />
        <FormikInput name="role" label="Role" type="select">
          <option value="owner">Owner</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </FormikInput>
        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
      </Form>
    </FormikProvider>
  );
}
