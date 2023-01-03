import { CreateEntryDto } from '@/src/entry/dto/create-entry.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateTransactionEntryDto extends OmitType(CreateEntryDto, [
  'transactionId',
]) {}
