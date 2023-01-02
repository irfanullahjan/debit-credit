import { ArrayMinSize, IsNotEmpty } from 'class-validator';
import { CreateTransactionLedgerEntryDto } from './create-transaction-ledger-entry.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  description: string;

  @ArrayMinSize(2)
  @IsNotEmpty()
  ledgerEntries: CreateTransactionLedgerEntryDto[];
}
