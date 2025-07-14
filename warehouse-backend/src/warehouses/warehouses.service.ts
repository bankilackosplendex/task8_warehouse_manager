import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class WarehousesService {
  constructor(private prisma: DatabaseService) {}

  // --- CREATE A NEW WAREHOUSE ---
  create(createWarehouseDto: Prisma.WarehouseCreateInput) {
    return this.prisma.warehouse.create({
      data: createWarehouseDto,
    });
  }

  // --- ADD A NEW PRODUCT TO THE WAREHOUSE ---
  addProduct(
    createWarehouseProductDto: Prisma.WarehouseProductUncheckedCreateInput,
  ) {
    return this.prisma.warehouseProduct.create({
      data: createWarehouseProductDto,
    });
  }

  async addOrUpdateProduct(input: Prisma.WarehouseProductUncheckedCreateInput) {
    const { warehouseId, productId, quantity } = input;

    const existing = await this.prisma.warehouseProduct.findUnique({
      where: {
        warehouseId_productId: {
          warehouseId,
          productId,
        },
      },
    });

    if (existing) {
      const newQuantity = existing.quantity + quantity;

      if (newQuantity < 0) {
        throw new Error(
          `Can't export more than the available quantity the warehouse`,
        );
      }

      return this.prisma.warehouseProduct.update({
        where: {
          warehouseId_productId: {
            warehouseId,
            productId,
          },
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
    } else {
      if (quantity < 0) {
        throw new Error(`Negative quantity`);
      }

      return this.prisma.warehouseProduct.create({
        data: {
          warehouseId,
          productId,
          quantity,
        },
      });
    }
  }

  // --- GET ALL WAREHOUSES ---
  findAll() {
    return this.prisma.warehouse.findMany();
  }

  // --- GET ONE SPECIFIC WWAREHOUSE BY ID ---
  async findOne(id: number) {
    const warehouse = await this.prisma.warehouse.findUnique({
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
    if (!warehouse)
      throw new NotFoundException(`Warehouse with id ${id} not found`);
    return warehouse;
  }

  // --- UPDATE ONE SPECIFIC WAREHOUSE BY ID ---
  async update(id: number, updateWarehouseDto: Prisma.WarehouseUpdateInput) {
    await this.findOne(id);
    return this.prisma.warehouse.update({
      where: { id },
      data: updateWarehouseDto,
    });
  }

  // --- DELETE ONE SPECIFIC WAREHOUSE BY ID ---
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.warehouse.delete({ where: { id } });
  }

  // --- GET ONE SPECIFIC WAREHOUSE'S PRODUCTS ---
  async getWarehouseProducts(warehouseId: number) {
    return this.prisma.warehouseProduct.findMany({
      where: { warehouseId },
      include: {
        product: true,
      },
    });
  }
}
