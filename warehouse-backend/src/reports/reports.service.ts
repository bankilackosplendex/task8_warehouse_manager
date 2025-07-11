import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: DatabaseService) {}

  // --- CREATE REPORT PDF FILE ---
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

    // --- PDF REPORT FILE ---
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=warehouse-report-${warehouse.id}.pdf`,
    );
    doc.pipe(res);

    // --- TITLE ---
    doc.fontSize(20).text(`Warehouse Report`, { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(16).text(`Warehouse: ${warehouse.name}`, { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Generated at: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // --- PRODUCTS SECTION ---
    doc.fontSize(14).text('Products in stock', { underline: true });
    doc.moveDown(0.5);
    if (warehouse.products.length === 0) {
      doc.text('No products found.');
    } else {
      warehouse.products.forEach((item) => {
        doc
          .fontSize(12)
          .text(`• ${item.product.name}`, { continued: true })
          .text(`  | Quantity: ${item.quantity}`, { continued: true })
          .text(`  ${item.product.quantityType}`);
      });
    }

    doc.moveDown(1.5);

    // --- MOVEMENTS SECTION ---
    doc.fontSize(14).text('Stock Movements', { underline: true });
    doc.moveDown(0.5);
    if (warehouse.movements.length === 0) {
      doc.text('No stock movements found.');
    } else {
      warehouse.movements.forEach((movement) => {
        const company = movement.company?.name ?? 'N/A';
        doc
          .fontSize(12)
          .text(
            `• ${movement.createdAt.toLocaleDateString()} | ${movement.movementType} | ${movement.product.name} (${movement.quantity}) | ${company}`,
          );
      });
    }

    doc.end();
  }
}
