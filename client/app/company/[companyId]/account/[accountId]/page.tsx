import { fetchServerSide } from "../../../../../common/utils/fetchServerSide";
import { AccountTable } from "./AccountTable";

export default async function Account({
  params: { companyId, accountId },
}: {
  params: { companyId: number; accountId: number };
}) {
  const account = await fetchServerSide(
    `/company/${companyId}/account/${accountId}`
  );
  return (
    <div className="rounded shadow overflow-hidden">
      <AccountTable account={account} />
    </div>
  );
}
