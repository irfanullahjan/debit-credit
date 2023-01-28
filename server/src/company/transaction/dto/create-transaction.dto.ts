import { ArrayMinSize, IsNotEmpty, IsOptional } from 'class-validator';
import { IsBalanced } from '../../../common/decorators/is-balanced';
import { CreateTransactionEntryDto } from './create-transaction-entry.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  documentRef?: string;

  @ArrayMinSize(2)
  @IsNotEmpty()
  @IsBalanced('amount', {
    message: 'Sum of debit entries must be equal to sum of credit entries',
  })
  entries: CreateTransactionEntryDto[];
}
