import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipModule } from '../membership/membership.module';
import { Entry } from './entities/entry.entity';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), MembershipModule],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
