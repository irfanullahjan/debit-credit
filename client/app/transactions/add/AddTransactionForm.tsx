"use client";

import { FormikInput } from "@/app/components/FormikInput";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Button, Col, Row, Spinner } from "reactstrap";
import { useFetch } from "@/common/hooks/useFetch";

export function AddTransactionForm({ accounts }: any) {
  const [submit, submitting] = useFetch({
    feedback: {
      basedOn: "status",
      map: {
        201: {
          message: "Transaction saved",
          intent: "success",
        },
      },
    },
  });
  const emptyEntry = {
    accountId: "",
    amount: "",
  };
  const emptyTransaction = {
    date: "",
    description: "",
    entries: [emptyEntry, emptyEntry],
  };
  const formik = useFormik({
    initialValues: emptyTransaction,
    onSubmit: (values) => {
      submit("/ledger/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
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
                    <Button onClick={() => arrayHelpers.remove(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <br />
              <Button onClick={() => arrayHelpers.push(emptyEntry)}>Add</Button>
            </div>
          )}
        </FieldArray>
        <br />
        <Button type="submit" disabled={submitting} color="primary">
          Submit <Spinner size="sm" color="light" hidden={!submitting} />
        </Button>
      </form>
    </FormikProvider>
  );
}
