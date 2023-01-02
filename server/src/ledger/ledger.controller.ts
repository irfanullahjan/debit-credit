import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerEntryDto } from './dto/create-ledger-entry.dto';
import { UpdateLedgerEntryDto } from './dto/update-ledger-entry.dto';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  create(@Body() createLedgerDto: CreateLedgerEntryDto) {
    return this.ledgerService.create(createLedgerDto);
  }

  @Get()
  findAll() {
    return this.ledgerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ledgerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLedgerDto: UpdateLedgerEntryDto) {
    return this.ledgerService.update(+id, updateLedgerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ledgerService.remove(+id);
  }
}
