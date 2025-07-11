import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: DatabaseService) {}

  // --- CREATE A NEW COMPANY ---
  create(createCompanyDto: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  // --- GET ALL COMPANIES ---
  findAll() {
    return this.prisma.company.findMany();
  }

  // --- GET ONE SPECIFIC COMPANY BY ID ---
  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        movements: {
          include: {
            product: true,
            warehouse: true,
          },
        },
      },
    });
    if (!company)
      throw new NotFoundException(`Company with id ${id} not found`);
    return company;
  }

  // --- UPDATE ONE SPECIFIC COMPANY BY ID ---
  async update(id: number, updateCompanyDto: Prisma.CompanyUpdateInput) {
    await this.findOne(id);
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  // --- DELETE ONE SPECIFIC COMPANY BY ID ---
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.company.delete({ where: { id } });
  }
}
