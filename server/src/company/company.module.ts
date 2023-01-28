import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { EntryModule } from './entry/entry.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    AccountModule,
    EntryModule,
    TransactionModule,
    RouterModule.register([
      {
        path: 'company',
        children: [
          {
            path: 'account',
            module: AccountModule,
          },
          {
            path: 'entry',
            module: EntryModule,
          },
          {
            path: 'transaction',
            module: TransactionModule,
          },
        ],
      },
    ]),
  ],
})
export class CompanyModule {}
