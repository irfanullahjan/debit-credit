"use client";

import { BASE_URL_BACKEND } from "@/common/constants";
import { FormikInput } from "@/components/FormikInput";
import { FormikErrors, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: async (values) => {
      fetch(`${BASE_URL_BACKEND}/user`, {
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
    validate: (values) => {
      const errors: FormikErrors<typeof values> = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (values.password !== values.password2) {
        errors.password2 = "Passwords must match";
      }
      return errors;
    }
  });
  return (
    <div>
      <h1>Sign Up</h1>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput name="name" label="Name" />
          <FormikInput name="email" label="Email" />
          <FormikInput name="password" label="Password" />
          <FormikInput name="password2" label="Confirm Password" />
          <button type="submit">Submit</button>
        </form>
      </FormikProvider>
    </div>
  );
}
