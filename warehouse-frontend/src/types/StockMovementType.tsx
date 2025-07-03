import { MovementType } from "../enums/MovementTypeEnum";
import { Company } from "./CompanyType";
import { Product } from "./ProductType";
import { Warehouse } from "./WarehouseType";

export type StockMovement = {
  id: number;
  product: Product;
  productId: number;
  warehouse: Warehouse;
  warehouseId: number;
  quantity: number
  movementType: MovementType;
  company: Company;
  companyId: number;
  createdAt: Date;
}