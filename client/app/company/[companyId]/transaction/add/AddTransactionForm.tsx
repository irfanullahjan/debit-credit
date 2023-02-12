"use client";

import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Row, Spinner } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";

export function AddTransactionForm({ accounts, companyId }: any) {
  const [submit, submitting] = useFetch();

  const emptyEntry = {
    accountId: null,
    amountDebit: null,
    amountCredit: null,
  };

  const emptyTransaction = {
    date: "",
    description: "",
    entries: [emptyEntry, emptyEntry],
  };
  const formik = useFormik({
    initialValues: emptyTransaction,
    onSubmit: (values) => {
      submit(`/company/${companyId}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          entries: values.entries
            .filter((entry) => entry.accountId)
            .map((entry) => ({
              ...entry,
              amount: entry.amountDebit || entry.amountCredit! * -1,
            })),
        }),
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
    },
  });

  useEffect(() => {
    const entries = formik.values.entries;
    const lastEntry = entries[entries.length - 1];
    if (entries.length > 0 && Object.values(lastEntry).some((v) => v)) {
      entries.push(emptyEntry);
    } else {
      let last = entries.length - 1;
      while (last > 0 && !Object.values(entries[last]).some((v) => v)) {
        last--;
      }
      entries.splice(last + 2);
    }
  }, [formik.values.entries]);

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
                    <Col sm={6}>
                      <FormikInput
                        label={index === 0 ? "Account" : ""}
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
                    <Col sm={3}>
                      <FormikInput
                        className="text-right"
                        label={index === 0 ? "Debit" : ""}
                        name={`entries.${index}.amountDebit`}
                        type="number"
                      />
                    </Col>
                    <Col sm={3}>
                      <FormikInput
                        className="text-right"
                        label={index === 0 ? "Credit" : ""}
                        name={`entries.${index}.amountCredit`}
                        type="number"
                      />
                    </Col>
                  </Row>
                </div>
              ))}
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
