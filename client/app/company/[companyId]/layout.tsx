import { Realtime } from "../../../common/components/Realtime";

export default function CompanyLayout({
  params: { companyId },
  children,
}: any) {
  return (
    <>
      <Realtime eventName={`company:${companyId}`} />
      {children}
    </>
  );
}
