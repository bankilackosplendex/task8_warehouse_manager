import { Product } from "./ProductType";
import { Warehouse } from "./WarehouseType";

export type WarehouseProduct = {
  id: number;
  warehouse: Warehouse; 
  warehouseId: number;
  product: Product;
  productId: number,
  quantity: number;
  createdAt: Date;
}