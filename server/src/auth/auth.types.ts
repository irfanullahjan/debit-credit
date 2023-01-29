export type JwtPayload = {
  email: string;
  sub: number;
  companiesRoles: Record<number, string[]>; // { companyId: [role1, role2] }
};
