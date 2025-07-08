import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: DatabaseService) {}

  create(createCompanyDto: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        movements: true,
      },
    });
    if (!company)
      throw new NotFoundException(`Company with id ${id} not found`);
    return company;
  }

  async update(id: number, updateCompanyDto: Prisma.CompanyUpdateInput) {
    await this.findOne(id);
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.company.delete({ where: { id } });
  }
}
