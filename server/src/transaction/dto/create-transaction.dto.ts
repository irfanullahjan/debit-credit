import { ArrayMinSize, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateTransactionEntryDto } from './create-transaction-entry.dto';
export class CreateTransactionDto {
  @IsNotEmpty()
  description: string;

  @IsOptional()
  documentRef?: string;

  @ArrayMinSize(2)
  @IsNotEmpty()
  entries: CreateTransactionEntryDto[];
}
