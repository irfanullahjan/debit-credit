"use client";

import { Form, FormikProvider, useFormik } from "formik";
import { Col, Row, Table } from "reactstrap";
import useSWR from "swr";
import { FormikInput } from "~/common/components/FormikInput";
import { fetchJsonClientSide } from "~/common/utils/fetchClientSide";

export default function LedgerPage({ params: { companyId } }: any) {
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

  console.log(ledger);

  return (
    <div>
      <FormikProvider value={formikSearch}>
        <Form>
          <Row>
            <Col>
              <FormikInput name="accountId" label="Account" type="select">
                <option value="">All</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </FormikInput>
            </Col>
            <Col>
              <FormikInput name="description" label="Description" />
            </Col>
            <Col>
              <FormikInput name="dateFrom" label="Date From" type="date" />
            </Col>
            <Col>
              <FormikInput name="dateTo" label="Date To" type="date" />
            </Col>
          </Row>
        </Form>
      </FormikProvider>
      <Table hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Account</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ledger?.items.map((entry: any) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.transaction.description}</td>
              <td>{entry.account.name}</td>
              <td>{entry.amount}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
