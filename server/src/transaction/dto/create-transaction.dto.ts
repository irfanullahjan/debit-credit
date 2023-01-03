import { ArrayMinSize, IsNotEmpty } from 'class-validator';
import { CreateTransactionEntryDto } from './create-transaction-entry.dto';
export class CreateTransactionDto {
  @IsNotEmpty()
  description: string;

  @ArrayMinSize(2)
  @IsNotEmpty()
  entries: CreateTransactionEntryDto[];
}
