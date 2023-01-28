import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyUser } from './entities/company-user.entity';
import { Company } from './entities/company.entity';
import { EntryModule } from './entry/entry.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyUser]),
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
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
