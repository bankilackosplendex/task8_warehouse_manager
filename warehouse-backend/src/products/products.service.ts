import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: DatabaseService) {}

  // --- CREATE A NEW PRODUCT ---
  create(createProductDto: Prisma.ProductCreateInput) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // --- GET ALL PRODUCTS ---
  findAll() {
    return this.prisma.product.findMany();
  }

  // --- GET ONE SPECIFIC PRODUCT BY ID ---
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  // --- UPDATE ONE SPECIFIC PRODUCT BY ID ---
  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // --- DELETE ONE SPECIFIC PRODUCT BY ID ---
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }

  // --- GET ONE SPECIFIC PRODUCT'S WAREHOUSES ---
  async getProductWarehouses(productId: number) {
  return this.prisma.warehouseProduct.findMany({
    where: { productId },
    include: {
      warehouse: true,
    },
  });
}
}
