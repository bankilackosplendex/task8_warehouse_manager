import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class WarehousesService {
  constructor(private prisma: DatabaseService) {}

  create(createWarehouseDto: Prisma.WarehouseCreateInput) {
    return this.prisma.warehouse.create({
      data: createWarehouseDto,
    });
  }

  findAll() {
    return this.prisma.warehouse.findMany();
  }

  async findOne(id: number) {
    const warehouse = await this.prisma.warehouse.findUnique({ where: { id } });
    if (!warehouse)
      throw new NotFoundException(`Warehouse with id ${id} not found`);
    return warehouse;
  }

  async update(id: number, updateWarehouseDto: Prisma.WarehouseUpdateInput) {
    await this.findOne(id);
    return this.prisma.warehouse.update({
      where: { id },
      data: updateWarehouseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.warehouse.delete({ where: { id } });
  }

  async getWarehouseProducts(warehouseId: number) {
  return this.prisma.warehouseProduct.findMany({
    where: { warehouseId },
    include: {
      product: true,
    },
  });
}
}
