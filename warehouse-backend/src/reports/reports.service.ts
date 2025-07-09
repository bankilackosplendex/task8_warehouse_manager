import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: DatabaseService) {}

  async generateWarehouseReport(warehouseId: number, res: Response) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: warehouseId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        movements: {
          include: {
            product: true,
            company: true,
          },
        },
      },
    });

    if (!warehouse) throw new Error('Warehouse not found');

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=warehouse-report-${warehouse.id}.pdf`,
    );
    doc.pipe(res);

    doc
      .fontSize(18)
      .text(`Warehouse report: ${warehouse.name}`, { underline: true });
    doc.moveDown().fontSize(14).text('Products:');

    warehouse.products.forEach((stockItem) => {
      doc.text(
        `- ${stockItem.product.name}: ${stockItem.quantity} ${stockItem.product.quantityType}`,
      );
    });

    doc.moveDown().fontSize(14).text('Stockmovements:');
    warehouse.movements.forEach((movement) => {
      doc.text(
        `- ${movement.createdAt.toDateString()} | ${movement.movementType} | ${movement.product.name} (${movement.quantity}) | ${movement.company?.name ?? 'N/A'}`,
      );
    });

    doc.end();
  }
}
