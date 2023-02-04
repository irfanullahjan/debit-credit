import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MembershipRole } from '../entities/membership.entity';

export class CreateMembershipDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['owner', 'manager', 'user'])
  role: MembershipRole;
}
