import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CompanyGuard } from '../company.guard';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntryService } from './entry.service';

@Controller()
@UseGuards(CompanyGuard)
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() createEntryDto: CreateEntryDto,
  ) {
    return this.entryService.create(+companyId, createEntryDto);
  }

  @Get('search')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'size', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  @ApiQuery({ name: 'description', required: false })
  findPaginated(@Param('companyId') companyId: string, @Query() query: string) {
    return this.entryService.searchPaginated(+companyId, query);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.entryService.findAll(+companyId);
  }

  @Get(':id')
  findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.entryService.findOne(+companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.entryService.update(+companyId, +id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.entryService.remove(+companyId, +id);
  }
}
