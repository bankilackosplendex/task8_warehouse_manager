import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WarehousesModule } from './warehouses/warehouses.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { StockmovementsModule } from './stockmovements/stockmovements.module';
import { IamModule } from './iam/iam.module';
import { ReportsModule } from './reports/reports.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    WarehousesModule,
    ProductsModule,
    DatabaseModule,
    UsersModule,
    CompaniesModule,
    StockmovementsModule,
    IamModule,
    ReportsModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
