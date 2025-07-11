import { Controller, Get, Res } from '@nestjs/common';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { StatisticsService } from './statistics.service';
import { Role } from 'generated/prisma';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  // --- GET TOP SUPPLIERS STATISTICS ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Get('/topsuppliers')
  getTopSuppliers() {
    return this.statisticsService.topSuppliers();
  }

  // --- GET TOP COSTUMERS STATISTICS ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Get('/topcostumers')
  getTopCostumers() {
    return this.statisticsService.topCustomers();
  }

  // --- GET MOST MOVED PRODUCTS STATISTICS ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Get('/mostmovedproducts')
  getMostMovedProducts() {
    return this.statisticsService.mostMovedProducts();
  }
}
