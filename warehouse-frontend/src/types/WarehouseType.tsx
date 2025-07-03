import { StockMovement } from "./StockMovementType";
import { WarehouseProduct } from "./WarehouseProductType";

export type Warehouse = {
  id: number;
  name: string;
  address: string;
  description: string;
  products: WarehouseProduct[];
  movements: StockMovement[];
}