import { Controller, Get, Param, Res, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('warehouse/:id')
  async getWarehouseReport(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return this.reportsService.generateWarehouseReport(id, res);
  }
}
