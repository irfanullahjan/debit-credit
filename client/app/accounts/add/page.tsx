"use client";

import { FormikInput } from "@/app/components/FormikInput";
import { FormikProvider, useFormik } from "formik";
import { useFetch } from "@/common/hooks/useFetch";
import { Button } from "@/app/components/Button";
import { Spinner } from "reactstrap";

export default function AccountAddPage() {
  const [submit, submitting] = useFetch({
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
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      submit("/ledger/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
