import { Controller, Get, Res } from '@nestjs/common';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Roles('ADMIN')
  @Get('/statistics/topsuppliers')
  getTopSuppliers(@Res() res: Response) {
    return this.statisticsService.topSuppliers();
  }

  @Roles('ADMIN')
  @Get('/statistics/topcostumeres')
  getTopCostumers(@Res() res: Response) {
    return this.statisticsService.topCustomers();
  }

  @Roles('ADMIN')
  @Get('/statistics/mostmovedproducts')
  getMostMovedProducts(@Res() res: Response) {
    return this.statisticsService.mostMovedProducts();
  }
}
