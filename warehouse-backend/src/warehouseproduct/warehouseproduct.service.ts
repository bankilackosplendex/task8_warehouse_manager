import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WarehouseproductService {
  constructor(private prisma: DatabaseService) {}
  
  async create(createWarehouseproductDto: Prisma.WarehouseProductCreateInput) {
    return this.prisma.warehouseProduct.create({
      data: createWarehouseproductDto,
    });
  }

  async findAll() {
    return this.prisma.warehouseProduct.findMany({
      include: {
        warehouse: true,
        product: true,
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.warehouseProduct.findUnique({
      where: { id },
      include: {
        warehouse: true,
        product: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`WarehouseProduct with id ${id} not found`);
    }
    return record;
  }

  async update(id: number, updateWarehouseproductDto: Prisma.WarehouseProductUpdateInput) {
    await this.findOne(id);
    return this.prisma.warehouseProduct.update({
      where: { id },
      data: updateWarehouseproductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.warehouseProduct.delete({
      where: { id },
    });
  }
}
