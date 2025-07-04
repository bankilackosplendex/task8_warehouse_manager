import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { Prisma, Role } from 'generated/prisma';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createCoffeeDto: Prisma.WarehouseCreateInput) {
    return this.warehousesService.create(createCoffeeDto);
  }

  @Get()
  findAll() {
    return this.warehousesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehousesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: Prisma.WarehouseUpdateInput,
  ) {
    return this.warehousesService.update(+id, updateCoffeeDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehousesService.remove(+id);
  }

  @Get(':id/products')
  getProductsByWarehouse(@Param('id', ParseIntPipe) id: number) {
    return this.warehousesService.getWarehouseProducts(id);
  }
}
