import { Link } from "react-router-dom";
import WarehouseList from "../../components/warehouses/WarehouseList.tsx";
import "./WarehousesPage.scss";

function WarehousePage() {
  return (
    <div className="warehousesPage">
      <h2 className="warehousesPage__title">Warehouses</h2>
      <WarehouseList />
      <Link to="/warehouses/add">
        <button className="warehousesPage__addButton">Add new warehouse</button>
      </Link>
    </div>
  );
}

export default WarehousePage;
