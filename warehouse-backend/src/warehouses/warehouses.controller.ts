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

  // --- CREATE A NEW WAREHOUSE ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Post()
  create(@Body() createCoffeeDto: Prisma.WarehouseCreateInput) {
    return this.warehousesService.create(createCoffeeDto);
  }

  // --- GET ALL WAREHOUSES ---
  @Get()
  findAll() {
    return this.warehousesService.findAll();
  }

  // --- GET ONE SPECIFIC WWAREHOUSE BY ID ---
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehousesService.findOne(id);
  }

  // --- UPDATE ONE SPECIFIC WAREHOUSE BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: Prisma.WarehouseUpdateInput,
  ) {
    return this.warehousesService.update(+id, updateCoffeeDto);
  }

  // --- DELETE ONE SPECIFIC WAREHOUSE BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehousesService.remove(+id);
  }

  // --- GET ONE SPECIFIC WAREHOUSE'S PRODUCTS ---
  @Get(':id/products')
  getProductsByWarehouse(@Param('id', ParseIntPipe) id: number) {
    return this.warehousesService.getWarehouseProducts(id);
  }
}
