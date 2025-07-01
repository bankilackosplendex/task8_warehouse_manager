import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StockmovementsService {
  constructor(private prisma: DatabaseService) {}

  create(createStockmovementDto: Prisma.StockMovementCreateInput) {
    return this.prisma.stockMovement.create({
      data: createStockmovementDto,
    });
  }

  findAll() {
    return this.prisma.stockMovement.findMany();
  }

  async findOne(id: number) {
    const stockMovement = await this.prisma.stockMovement.findUnique({
      where: { id },
    });
    if (!stockMovement)
      throw new NotFoundException(`Stock movement with id ${id} not found`);
    return stockMovement;
  }

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

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.stockMovement.delete({ where: { id } });
  }
}
