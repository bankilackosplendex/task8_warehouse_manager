import { Module } from '@nestjs/common';
import { WarehouseproductService } from './warehouseproduct.service';
import { WarehouseproductController } from './warehouseproduct.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WarehouseproductController],
  providers: [WarehouseproductService],
})
export class WarehouseproductModule {}
