import { CreateLedgerEntryDto } from '@/src/ledger/dto/create-ledger-entry.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateTransactionLedgerEntryDto extends OmitType(
  CreateLedgerEntryDto,
  ['transactionId'],
) {}
