import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyGuard } from './company.guard';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':companyId')
  @UseGuards(CompanyGuard)
  findOne(@Param('companyId') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':companyId')
  @UseGuards(CompanyGuard)
  update(
    @Param('companyId') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':companyId')
  @UseGuards(CompanyGuard)
  remove(@Param('companyId') id: string) {
    return this.companyService.remove(+id);
  }
}
