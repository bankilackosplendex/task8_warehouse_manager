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
import { Prisma, Role } from 'generated/prisma';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';

@Controller('stockmovements')
export class StockmovementsController {
  constructor(private readonly stockmovementsService: StockmovementsService) {}

  @Roles(Role.ADMIN)
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

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockmovementDto: Prisma.StockMovementUpdateInput,
  ) {
    return this.stockmovementsService.update(id, updateStockmovementDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockmovementsService.remove(id);
  }
}
