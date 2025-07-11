import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, Role } from 'generated/prisma';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // --- CREATE A NEW PRODUCT ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  // --- GET ALL PRODUCTS ---
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // --- GET ONE SPECIFIC PRODUCT BY ID ---
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // --- UPDATE ONE SPECIFIC PRODUCT BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  // --- DELETE ONE SPECIFIC PRODUCT BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // --- GET ONE SPECIFIC PRODUCT'S WAREHOUSES ---
  @Get(':id/warehouses')
  getWarehousesByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductWarehouses(id);
  }
}
