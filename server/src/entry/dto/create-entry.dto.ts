import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  accountId: number;

  @IsNotEmpty()
  transactionId: number;
}
