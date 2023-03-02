"use client";

import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";

export function AccountForm({ companyId, existingData }: any) {
  const [submit, submitting] = useFetch();

  const router = useRouter();

  const formik = useFormik({
    initialValues: existingData ?? {
      name: "",
    },
    onSubmit: (values) => {
      const patchSegment = existingData ? `/${existingData.id}` : "";
      const formValues = {
        name: values.name,
      };
      submit(`/company/${companyId}/account${patchSegment}`, {
        method: existingData ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        feedback: {
          basedOn: "status",
          map: {
            201: {
              message: "Account created",
              intent: "success",
            },
            200: {
              message: "Account updated",
              intent: "success",
            },
          },
        },
      }).then((res) => {
        if (res.ok) {
          router.refresh();
          if (res.status === 201) {
            formik.resetForm();
          }
        }
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
