import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseproductController } from './warehouseproduct.controller';
import { WarehouseproductService } from './warehouseproduct.service';

describe('WarehouseproductController', () => {
  let controller: WarehouseproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseproductController],
      providers: [WarehouseproductService],
    }).compile();

    controller = module.get<WarehouseproductController>(WarehouseproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
