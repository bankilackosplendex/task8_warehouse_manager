import "./WarehousesPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import WarehouseList from "../../components/warehouses/WarehouseList.tsx";
import WarehouseDetails from "../../components/warehouses/WarehouseDetails.tsx";
import WarehouseForm from "../../components/warehouses/WarehouseForm.tsx";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { Route, Routes } from "react-router-dom";
import { ClipboardList, LayoutList, Pencil, SquarePlus } from "lucide-react";
import ErrorWindow from "../../components/common/ErrorWindow.tsx";
import ProtectedRoute from "../../components/authorization/ProtectedRoute.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

function WarehousePage() {
  return (
    // Warehouse page
    <div className="warehousesPage">
      {/* Routes in /warehouses */}
      <Routes>
        {/* Warehouse list */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={[Role.USER, Role.ADMIN]}>
              {/* Page header */}
              <div className="warehousesPage__listHeader">
                <BackButton />
                {/* Title */}
                <h2 className="warehousesPage__listHeader__title">
                  <LayoutList />
                  Warehouses
                </h2>
              </div>
              {/* List component */}
              <WarehouseList />
            </ProtectedRoute>
          }
        />
        {/* Warehouse details */}
        <Route
          path="/:warehouseId"
          element={
            <ProtectedRoute allowedRoles={[Role.USER, Role.ADMIN]}>
              {/* Page header */}
              <div className="warehousesPage__detailsHeader">
                <BackButton />
                {/* Title */}
                <h2 className="warehousesPage__detailsHeader__title">
                  <ClipboardList />
                  Warehouse details
                </h2>
              </div>
              {/* Details component */}
              <WarehouseDetails />
            </ProtectedRoute>
          }
        />

        {/* Warehouse create form */}
        <Route
          path="/add"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
              {/* Page header */}
              <div className="warehousesPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="warehousesPage__formHeader__title">
                  <SquarePlus />
                  Add new warehouse
                </h2>
              </div>
              {/* Form component */}
              <WarehouseForm type={FormType.CREATE} />
            </ProtectedRoute>
          }
        />
        {/* Warehouse update from */}
        <Route
          path="modify/:warehouseId"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
              {/* Page header */}
              <div className="warehousesPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="warehousesPage__formHeader__title">
                  <Pencil />
                  Modify warehouse
                </h2>
              </div>
              {/* Form component */}
              <WarehouseForm type={FormType.MODIFY} />
            </ProtectedRoute>
          }
        />
        {/* Not found page */}
        <Route
          path="/*"
          element={
            <ErrorWindow
              text={"404 Not found"}
              statusCode={404}
              onClose={function () {}}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default WarehousePage;
