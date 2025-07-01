import { Link } from "react-router-dom";
import WarehouseDetails from "./WarehouseDetails.tsx";

function WarehouseList() {
  return (
    <div>
      Warehouse List
      <Link to="/warehouses/warehouse1">
        <WarehouseDetails />
      </Link>
      <Link to="/warehouses/warehouse2">
        <WarehouseDetails />
      </Link>
      <Link to="/warehouses/warehouse3">
        <WarehouseDetails />
      </Link>
    </div>
  );
}

export default WarehouseList;
