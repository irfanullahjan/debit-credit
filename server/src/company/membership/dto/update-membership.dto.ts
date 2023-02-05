import { OmitType } from '@nestjs/swagger';
import { CreateMembershipDto } from './create-membership.dto';

export class UpdateMembershipDto extends OmitType(CreateMembershipDto, [
  'email',
]) {}
