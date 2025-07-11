import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: DatabaseService) {}

  // --- GET TOP 5 COMPANIES WITH THE MOST EXPORTS ---
  async topSuppliers() {
    return this.prisma.stockMovement.groupBy({
      by: ['companyId'],
      where: { movementType: 'EXPORT', companyId: { not: null } },
      _count: true,
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });
  }

  // --- GET TOP 5 COMPANIES WITH THE MOST IMPORTS ---
  async topCustomers() {
    return this.prisma.stockMovement.groupBy({
      by: ['companyId'],
      where: { movementType: 'IMPORT', companyId: { not: null } },
      _count: true,
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });
  }

  // --- GET TOP 5 PRODUCTS WITH THE MOST MOVEMENTS ---
  async mostMovedProducts() {
    return this.prisma.stockMovement.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
  }
}
