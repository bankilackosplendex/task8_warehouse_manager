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

  // --- CREATE A NEW MOVEMENT ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Post()
  create(@Body() createStockmovementDto: Prisma.StockMovementCreateInput) {
    return this.stockmovementsService.create(createStockmovementDto);
  }

  // --- GET ALL MOVEMENTS ---
  @Get()
  findAll() {
    return this.stockmovementsService.findAll();
  }

  // --- GET ONE SPECIFIC MOVEMENT BY ID ---
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockmovementsService.findOne(id);
  }

  // --- UPDATE ONE SPECIFIC MOVEMENT BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockmovementDto: Prisma.StockMovementUpdateInput,
  ) {
    return this.stockmovementsService.update(id, updateStockmovementDto);
  }

  // --- DELETE ONE SPECIFIC MOVEMENT BY ID ---
  @Roles(Role.ADMIN) // -> only with ADMIN role
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockmovementsService.remove(id);
  }
}
