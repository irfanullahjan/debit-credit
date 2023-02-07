export function isOwner(user: any, companyId: string | number) {
  const membership = user?.memberships?.find(
    (m: any) => m.companyId === +companyId
  );
  return membership?.role === "owner";
}
