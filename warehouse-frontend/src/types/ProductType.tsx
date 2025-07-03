import { QuantityType } from "../enums/QuantityTypeEnum";
import { StockMovement } from "./StockMovementType";
import { WarehouseProduct } from "./WarehouseProductType";

export type Product = {
  id: string;
  name: string;
  number: number;
  quantityType: QuantityType;
  warehouses: WarehouseProduct[];
  movements: StockMovement[];
  createdAt: Date;
};