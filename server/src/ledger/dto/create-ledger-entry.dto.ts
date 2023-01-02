import { IsNotEmpty } from 'class-validator';

export class CreateLedgerEntryDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  accountId: number;

  @IsNotEmpty()
  transactionId: number;
}
