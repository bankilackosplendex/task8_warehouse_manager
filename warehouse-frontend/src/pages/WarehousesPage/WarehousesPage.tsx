import "./WarehousesPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import WarehouseList from "../../components/warehouses/WarehouseList.tsx";
import WarehouseDetails from "../../components/warehouses/WarehouseDetails.tsx";
import WarehouseForm from "../../components/warehouses/WarehouseForm.tsx";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { Route, Routes } from "react-router-dom";

function WarehousePage() {
  return (
    // Warehouse page
    <div className="warehousesPage">
      <div className="warehousesPage__header">
        <BackButton />
        {/* Title */}
        <h2 className="warehousesPage__header__title">Warehouses</h2>
      </div>
      {/* Routes in /warehouses */}
      <Routes>
        {/* Warehouse list */}
        <Route path="/" element={<WarehouseList />} />
        {/* Warehouse details */}
        <Route path="/:warehouseId" element={<WarehouseDetails />} />
        {/* Warehouse create form */}
        <Route path="/add" element={<WarehouseForm type={FormType.CREATE} />} />
        {/* Warehouse update from */}
        <Route
          path="modify/:warehouseId"
          element={<WarehouseForm type={FormType.MODIFY} />}
        />
      </Routes>
    </div>
  );
}

export default WarehousePage;
