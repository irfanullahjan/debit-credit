"use client";

import { FormikInput } from "@/components/FormikInput";
import { FormikProvider, useFormik } from "formik";

export default function AccountAddPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:3001/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          alert("Transaction saved");
        } else {
          alert("Transaction not saved");
          console.error(response);
        }
      });
    },
  });
  return (
    <div>
      <FormikProvider value={formik}>
        <FormikInput label="Name" name="name" />
        <br />
        <button type="submit" onClick={formik.submitForm}>
          Submit
        </button>
      </FormikProvider>
    </div>
  );
}