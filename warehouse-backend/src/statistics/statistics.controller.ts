import { Controller, Get, Res } from '@nestjs/common';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { StatisticsService } from './statistics.service';
import { Role } from 'generated/prisma';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Roles(Role.ADMIN)
  @Get('/topsuppliers')
  getTopSuppliers() {
    return this.statisticsService.topSuppliers();
  }

  @Roles(Role.ADMIN)
  @Get('/topcostumers')
  getTopCostumers() {
    return this.statisticsService.topCustomers();
  }

  @Roles(Role.ADMIN)
  @Get('/mostmovedproducts')
  getMostMovedProducts() {
    return this.statisticsService.mostMovedProducts();
  }
}
