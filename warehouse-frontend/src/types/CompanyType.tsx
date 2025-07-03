import { StockMovement } from "./StockMovementType";

export type Company = {
  id: number;
  name: string;
  movements: StockMovement[];
}