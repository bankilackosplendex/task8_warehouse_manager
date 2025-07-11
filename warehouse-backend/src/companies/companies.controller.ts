import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Prisma, Role } from 'generated/prisma';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // --- CREATE A NEW COMPANY ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Post()
  create(@Body() createCompanyDto: Prisma.CompanyCreateInput) {
    return this.companiesService.create(createCompanyDto);
  }

  // --- GET ALL COMPANIES ---
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  // --- GET ONE SPECIFIC COMPANY BY ID ---
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  // --- UPDATE ONE SPECIFIC COMPANY BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: Prisma.CompanyUpdateInput,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  // --- DELETE ONE SPECIFIC COMPANY BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }
}
