import { MembershipRole } from '../company/membership/entities/membership.entity';

export type JwtPayload = {
  email: string;
  sub: number;
  memberships: Record<number, MembershipRole>; // { companyId: role }
};
