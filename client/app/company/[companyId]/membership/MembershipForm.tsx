"use client";

import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";

export function MembershipForm({
  existingData,
  companyId,
}: {
  existingData?: {
    membershipId: number;
    email: string;
    role: string;
  };
  companyId: number;
}) {
  const router = useRouter();
  const [statefulFetch, loading] = useFetch();
  const formik = useFormik({
    initialValues: existingData ?? {
      email: "",
      role: "user",
    },
    onSubmit: async (values) => {
      const membershipId = existingData?.membershipId;
      const putSegment = membershipId ? `/${membershipId}` : "";
      const submitValues: any = { role: values.role };
      if (!membershipId) {
        submitValues.email = values.email;
      }
      statefulFetch(`/company/${companyId}/membership${putSegment}`, {
        method: existingData ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitValues),
        feedback: {
          basedOn: "outcome",
          map: {
            success: {
              message: "Membership saved",
              intent: "success",
            },
          },
        },
      }).then((res) => {
        if (res.ok) {
          router.refresh();
          router.push(`/company/${companyId}/membership`);
        }
      });
    },
  });

  return (
    <div>
      <FormikProvider value={formik}>
        <FormikInput
          name="email"
          label="Email"
          disabled={!!existingData?.membershipId}
        />
        <FormikInput name="role" label="Role" type="select">
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </FormikInput>
      </FormikProvider>
      <Button type="submit" disabled={loading} onClick={formik.submitForm}>
        Submit
      </Button>
      {existingData && (
        <Button
          color="danger"
          disabled={loading}
          onClick={() => {
            statefulFetch(
              `/company/${companyId}/membership/${existingData.membershipId}`,
              {
                method: "DELETE",
                feedback: {
                  basedOn: "outcome",
                  map: {
                    success: {
                      message: "Membership removed",
                      intent: "success",
                    },
                  },
                },
              }
            ).then((res) => {
              if (res.ok) {
                router.push(`/company/${companyId}/membership`);
                router.refresh();
              }
            });
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
}
