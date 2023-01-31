"use client";

import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "reactstrap";
import { FormikInput } from "../../../common/components/FormikInput";
import { useFetch } from "../../../common/hooks/useFetch";

export function AddCompanyForm() {
  const router = useRouter();
  const [submit, submitting] = useFetch({
    feedback: {
      basedOn: "outcome",
      map: {
        success: {
          intent: "success",
          message: "Company added successfully",
        },
      },
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      submit("/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 201) return res.json();
          throw new Error("Failed to add company");
        })
        .then((company) => {
          router.push(`/company/${company.id}`);
        });
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <FormikInput name="name" label="Name" />
        <Button type="submit" color="primary" disabled={submitting}>
          Submit
        </Button>
      </Form>
    </FormikProvider>
  );
}
