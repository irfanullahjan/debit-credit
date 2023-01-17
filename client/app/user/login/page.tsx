"use client";

import { BASE_URL } from "@/common/constants";
import { FormikInput } from "@/app/components/FormikInput";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { fetchClientSide } from "@/utils/fetchClientSide";

export default function LoginPage() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      fetchClientSide("/auth/login", {
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
