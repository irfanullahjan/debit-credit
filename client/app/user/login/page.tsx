"use client";

import { FormikInput } from "@/components/FormikInput";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.ok && router.refresh())
        .catch((err) => {
          console.error(err);
        });
    },
  });
  return (
    <div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput name="email" label="Email" />
          <FormikInput name="password" label="Password" />
          <button type="submit">Submit</button>
        </form>
      </FormikProvider>
    </div>
  );
}
