import { fetchServerSide } from "../../../../../common/utils/fetchServerSide";
import { AccountTable } from "./AccountTable";

export default async function Account({
  params,
}: {
  params: { companyId: number; id: number };
}) {
  const { companyId, id } = params;
  const account = await fetchServerSide(`/company/${companyId}/account/${id}`);
  return (
    <div className="rounded shadow overflow-hidden">
      <AccountTable account={account} />
    </div>
  );
}
