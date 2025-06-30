import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WarehousesModule } from './warehouses/warehouses.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [WarehousesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
