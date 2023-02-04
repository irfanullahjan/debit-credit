import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from "~/common/components/reactstrap";
import { fetchServerSide } from "~/common/utils/fetchServerSide";

export default async function Home() {
  const user = await fetchServerSide("/auth/current-user");
  if (!user?.id) {
    redirect("/user/login");
  }
  const companies = await fetchServerSide("/company");
  return (
    <>
      {companies.map((company: any) => (
        <Link key={company.id} href={`/company/${company.id}`}>
          <Card
            className="my-2"
            color="primary"
            inverse
            style={{
              width: "18rem",
              cursor: "pointer",
            }}
          >
            <CardHeader>Header</CardHeader>
            <CardBody>
              <CardTitle tag="h5">Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
            </CardBody>
          </Card>
        </Link>
      ))}
    </>
  );
}
