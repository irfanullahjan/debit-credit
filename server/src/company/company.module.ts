import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { EntryModule } from './entry/entry.module';
import { MembershipModule } from './membership/membership.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    AccountModule,
    EntryModule,
    TransactionModule,
    MembershipModule,
    RouterModule.register([
      {
        path: 'company/:companyId',
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
          {
            path: 'membership',
            module: MembershipModule,
          },
        ],
      },
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
