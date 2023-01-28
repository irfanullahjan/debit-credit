import { OmitType } from '@nestjs/swagger';
import { CreateEntryDto } from '../../../company/entry/dto/create-entry.dto';

export class CreateTransactionEntryDto extends OmitType(CreateEntryDto, [
  'transactionId',
]) {}
