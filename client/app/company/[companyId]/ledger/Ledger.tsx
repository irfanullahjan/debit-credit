"use client";

import { Form, FormikProvider, useFormik } from "formik";
import { Col, Row, Table } from "reactstrap";
import useSWR from "swr";
import { FormikInput } from "~/common/components/FormikInput";
import { fetchJsonClientSide } from "~/common/utils/fetchClientSide";

export function Ledger({ companyId, accounts }: any) {
  const formikSearch = useFormik({
    initialValues: {
      page: "1",
      size: "10",
    },
    onSubmit: () => {},
  });

  const query = new URLSearchParams(formikSearch.values).toString();

  const { data: ledger } = useSWR(
    `/company/${companyId}/entry/search?${query}`,
    fetchJsonClientSide
  );

  return (
    <div>
      <Table hover>
        <thead style={{ backgroundColor: "#ddd" }}>
          <FormikProvider value={formikSearch}>
            <tr>
              <th>
                <FormikInput name="dateFrom" label="Date From" type="date" />
                <FormikInput name="dateTo" label="Date To" type="date" />
              </th>
              <th>
                <FormikInput name="description" label="Description" />
              </th>
              <th>
                <FormikInput name="accountId" label="Account" type="select">
                  <option value="">All</option>
                  {accounts?.map((account: any) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </FormikInput>
              </th>
              <th>
                <FormikInput
                  name="amountFrom"
                  label="Amount From"
                  type="number"
                />
                <FormikInput name="amountTo" label="Amount To" type="number" />
              </th>
            </tr>
          </FormikProvider>
        </thead>
        <tbody>
          {ledger?.items.map((entry: any) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.transaction.description}</td>
              <td>{entry.account.name}</td>
              <td>{entry.amount}</td>
            </tr>
          ))}
          {ledger?.items.length === 0 && (
            <tr>
              <td colSpan={5}>No entries found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
