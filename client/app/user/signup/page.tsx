"use client";

import { FormikErrors, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import { FormikInput } from "../../../common/components/FormikInput";
import { useFetch } from "../../../common/hooks/useFetch";

export default function LoginPage() {
  const [submit, submitting] = useFetch({
    feedback: {
      basedOn: "status",
      map: {
        201: {
          message: "Sign up successful",
          intent: "success",
        },
      },
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

  useEffect(() => {
    if (formik.values.email.indexOf("@error.com") !== -1) {
      throw new Error("Test error");
    }
  }, [formik.values.email]);

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
