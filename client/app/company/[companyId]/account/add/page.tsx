"use client";

import { FormikProvider, useFormik } from "formik";
import { Button, Spinner } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";

export default function AccountAddPage({ params: { companyId } }: any) {
  const [submit, submitting] = useFetch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      submit(`/company/${companyId}/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        feedback: {
          basedOn: "status",
          map: {
            201: {
              message: "Account created",
              intent: "success",
            },
          },
        },
      });
    },
  });
  return (
    <div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput label="Name" name="name" />
          <br />
          <Button type="submit" disabled={submitting} color="primary">
            Submit <Spinner size="sm" color="light" hidden={!submitting} />
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
}
