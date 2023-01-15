"use client";

import { BASE_URL_BACKEND } from "@/common/constants";
import { FormikInput } from "@/components/FormikInput";
import { fetchJson } from "@/utils/fetchJson";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Col, Row } from "reactstrap";
import useSWR from "swr";

export default function AddTransactionPage() {
  const { data: accounts } = useSWR(
    `${BASE_URL_BACKEND}/ledger/account`,
    fetchJson
  );
  console.log(accounts);
  const formik = useFormik({
    initialValues: {
      date: "",
      description: "",
      entries: [
        {
          accountId: "",
          amount: "",
        },
        {
          accountId: "",
          amount: "",
        },
      ],
    },
    onSubmit: (values) => {
      fetch(`${BASE_URL_BACKEND}/ledger/transaction`, {
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
        }
      });
    },
  });

  console.log(formik.values);
  return (
    <div>
      <FormikProvider value={formik}>
        <FormikInput label="Date" name="date" type="date" />
        <FormikInput label="Description" name="description" />
        <FieldArray name="entries">
          {(arrayHelpers) => (
            <div>
              {formik.values.entries.map((entry, index) => (
                <div key={index}>
                  <Row>
                    <Col>
                      <FormikInput
                        label="Account"
                        name={`entries.${index}.accountId`}
                        type="select"
                      >
                        <option value="">Select an account</option>
                        {accounts?.map?.((account: any) => (
                          <option key={account.id} value={account.id}>
                            {account.name}
                          </option>
                        ))}
                      </FormikInput>
                    </Col>
                    <Col>
                      <FormikInput
                        label="Amount"
                        name={`entries.${index}.amount`}
                        type="number"
                      />
                    </Col>
                  </Row>
                  {formik.values.entries.length > 2 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <br />
              <button
                type="button"
                onClick={() => arrayHelpers.push({ accountId: "", amount: "" })}
              >
                Add
              </button>
            </div>
          )}
        </FieldArray>
        <br />
        <button type="submit" onClick={formik.submitForm}>
          Submit
        </button>
      </FormikProvider>
    </div>
  );
}
