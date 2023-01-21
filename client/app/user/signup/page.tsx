"use client";

import { FormikInput } from "@/app/components/FormikInput";
import { FormikErrors, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { fetchClientSide } from "@/utils/fetchClientSide";
import { Intent, useSubmit } from "@/common/hooks/useSubmit";
import { Button, Spinner } from "reactstrap";

export default function LoginPage() {
  const { submit, submitting } = useSubmit(fetchClientSide, {
    201: {
      message: "Account created successfully, redirecting to login page...",
      intent: Intent.SUCCESS,
    },
    400: {
      message: "Invalid request",
      intent: Intent.DANGER,
    },
  });

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: async (values) => {
      submit("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.status === 201 && router.push("/user/login"))
        .catch((err) => console.error(err));
    },
    // validate: (values) => {
    //   const errors: FormikErrors<typeof values> = {};
    //   if (!values.name) {
    //     errors.name = "Required";
    //   }
    //   if (!values.email) {
    //     errors.email = "Required";
    //   }
    //   if (!values.password) {
    //     errors.password = "Required";
    //   }
    //   if (values.password !== values.password2) {
    //     errors.password2 = "Passwords must match";
    //   }
    //   return errors;
    // },
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
          <Button type="submit" disabled={submitting}>
            Submit <Spinner size="sm" color="light" hidden={!submitting} />
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
}
