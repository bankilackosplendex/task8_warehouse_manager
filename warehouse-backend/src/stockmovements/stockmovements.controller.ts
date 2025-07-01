import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StockmovementsService } from './stockmovements.service';
import { Prisma } from 'generated/prisma';

@Controller('stockmovements')
export class StockmovementsController {
  constructor(private readonly stockmovementsService: StockmovementsService) {}

  @Post()
  create(@Body() createStockmovementDto: Prisma.StockMovementCreateInput) {
    return this.stockmovementsService.create(createStockmovementDto);
  }

  @Get()
  findAll() {
    return this.stockmovementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockmovementsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockmovementDto: Prisma.StockMovementUpdateInput,
  ) {
    return this.stockmovementsService.update(id, updateStockmovementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockmovementsService.remove(id);
  }
}
