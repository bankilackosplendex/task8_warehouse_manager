import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WarehouseproductService } from './warehouseproduct.service';
import { Prisma, Role } from 'generated/prisma';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';

@Controller('warehouseproduct')
export class WarehouseproductController {
  constructor(private readonly warehouseproductService: WarehouseproductService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createWarehouseproductDto: Prisma.WarehouseProductUncheckedCreateInput) {
    return this.warehouseproductService.create({
      warehouse: { connect: { id: createWarehouseproductDto.warehouseId } },
      product: { connect: { id: createWarehouseproductDto.productId } },
      quantity: createWarehouseproductDto.quantity,
    });
  }

  @Get()
  findAll() {
    return this.warehouseproductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseproductService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWarehouseproductDto: Prisma.WarehouseProductUpdateInput) {
    return this.warehouseproductService.update(+id, updateWarehouseproductDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseproductService.remove(+id);
  }
}
