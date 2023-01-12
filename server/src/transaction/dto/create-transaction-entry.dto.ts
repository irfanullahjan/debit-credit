import { CreateEntryDto } from '@/src/entry/dto/create-entry.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateTransactionEntryDto extends OmitType(CreateEntryDto, [
  'transactionId',
]) {}
