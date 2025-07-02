import WarehouseList from "../../components/warehouses/WarehouseList.tsx";
import "./WarehousesPage.scss";

function WarehousePage() {
  return (
    <div className="warehousesPage">
      <h2 className="warehousesPage__title">Warehouses</h2>
      <WarehouseList />
    </div>
  );
}

export default WarehousePage;
