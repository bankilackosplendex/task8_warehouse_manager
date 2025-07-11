import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StockmovementsService {
  constructor(private prisma: DatabaseService) {}

  // --- CREATE A NEW MOVEMENT ---
  create(createStockmovementDto: Prisma.StockMovementCreateInput) {
    return this.prisma.stockMovement.create({
      data: createStockmovementDto,
    });
  }

  // --- GET ALL MOVEMENTS ---
  findAll() {
    return this.prisma.stockMovement.findMany({
      include: {
        product: true,
        warehouse: true,
        company: true,
      },
    });
  }

  // --- GET ONE SPECIFIC MOVEMENT BY ID ---
  async findOne(id: number) {
    const stockMovement = await this.prisma.stockMovement.findUnique({
      where: { id },
      include: {
        product: true,
        warehouse: true,
        company: true,
      },
    });
    if (!stockMovement)
      throw new NotFoundException(`Stock movement with id ${id} not found`);
    return stockMovement;
  }

  // --- UPDATE ONE SPECIFIC MOVEMENT BY ID ---
  async update(
    id: number,
    updateStockmovementDto: Prisma.StockMovementUpdateInput,
  ) {
    await this.findOne(id);
    return this.prisma.stockMovement.update({
      where: { id },
      data: updateStockmovementDto,
    });
  }

  // --- DELETE ONE SPECIFIC MOVEMENT BY ID ---
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.stockMovement.delete({ where: { id } });
  }
}
