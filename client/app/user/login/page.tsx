"use client";

import { FormikInput } from "@/app/components/FormikInput";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "reactstrap";
import { useFetch } from "@/common/hooks/useFetch";

export default function LoginPage() {
  const [submit, submitting] = useFetch({
    feedback: {
      basedOn: "status",
      map: {
        200: {
          message: "Login successful",
          intent: "success"
        },
      },
    },
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      submit("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            router.refresh();
            router.push("/");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput name="email" label="Email" />
          <FormikInput name="password" label="Password" />
          <Button type="submit" disabled={submitting}>
            Submit <Spinner size="sm" color="light" hidden={!submitting} />
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
}
