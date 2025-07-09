import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class StatisticsService {
  constructor(private prisma: DatabaseService) {}

  async topSuppliers() {
    return this.prisma.stockMovement.groupBy({
      by: ['companyId'],
      where: { movementType: 'EXPORT', companyId: { not: null } },
      _count: true,
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });
  }

  async topCustomers() {
    return this.prisma.stockMovement.groupBy({
      by: ['companyId'],
      where: { movementType: 'IMPORT', companyId: { not: null } },
      _count: true,
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });
  }

  async mostMovedProducts() {
    return this.prisma.stockMovement.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
  }
}
