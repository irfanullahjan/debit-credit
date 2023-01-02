import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LedgerEntry } from '../ledger/entities/ledger-entry.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
    private dataSource: DataSource,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        // save the new transaction and get the id
        const transaction = await transactionalEntityManager.save(
          this.repository.create(createTransactionDto),
        );

        // create the ledger entries
        const ledgerEntries = createTransactionDto.ledgerEntries.map(
          (ledgerEntry) =>
            transactionalEntityManager.getRepository(LedgerEntry).create({
              ...ledgerEntry,
              transactionId: transaction.id,
              accountId: ledgerEntry.accountId,
            }),
        );
        // save the ledger entries
        await transactionalEntityManager.save(LedgerEntry, ledgerEntries);

        return { ...transaction, ledgerEntries };
      },
    );
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.repository.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
