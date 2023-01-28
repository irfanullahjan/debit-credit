import { fetchServerSide } from "../../../common/utils/fetchServerSide";
import { AccountTable } from "./AccountTable";

export default async function Account({ params }: { params: { id: number } }) {
  const { id } = params;
  const account = await fetchServerSide(`/company/account/${id}`);
  return (
    <div className="rounded shadow overflow-hidden">
      <AccountTable account={account} />
    </div>
  );
}
