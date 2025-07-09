import { Link, Route, Routes } from "react-router-dom";
import StockMovementList from "../../components/stockmovements/StockMovementList.tsx";
import "./StockMovementsPage.scss";
import { ClipboardList, LayoutList, Pencil, SquarePlus } from "lucide-react";
import BackButton from "../../components/common/BackButton.tsx";
import StockMovementDetails from "../../components/stockmovements/StockMovementDetails.tsx";
import StockMovementsForm from "../../components/stockmovements/StockMovementForm.tsx";
import { FormType } from "../../enums/FormTypeEnum.tsx";

function StockMovementsPage() {
  return (
    // Stockmovements page
    <div className="stockmovementsPage">
      {/* Routes in /stockmovements */}
      <Routes>
        {/* Stockmovement list */}
        <Route
          path="/"
          element={
            <>
              {/* Page header */}
              <div className="stockmovementsPage__listHeader">
                <BackButton />
                {/* Title */}
                <h2 className="stockmovementsPage__listHeader__title">
                  <LayoutList />
                  Movements
                </h2>
              </div>
              {/* List component */}
              <StockMovementList />
            </>
          }
        />
        {/* Stockmovement details */}
        <Route
          path="/:stockMovementId"
          element={
            <>
              {/* Page header */}
              <div className="stockmovementsPage__detailsHeader">
                <BackButton />
                {/* Title */}
                <h2 className="stockmovementsPage__detailsHeader__title">
                  <ClipboardList />
                  Movement details
                </h2>
              </div>
              {/* Details component */}
              <StockMovementDetails />
            </>
          }
        />
        {/* Stockmovement create form */}
        <Route
          path="/add"
          element={
            <>
              {/* Page header */}
              <div className="stockmovementsPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="stockmovementsPage__formHeader__title">
                  <SquarePlus />
                  Add new movement
                </h2>
              </div>
              {/* Form component */}
              <StockMovementsForm type={FormType.CREATE} />
            </>
          }
        />
        {/* Stockmovement update form */}
        <Route
          path="/modify/:stockMovementId"
          element={
            <>
              {/* Page header */}
              <div className="stockmovementsPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="stockmovementsPage__formHeader__title">
                  <Pencil />
                  Modify stockmovements
                </h2>
              </div>
              {/* Form component */}
              <StockMovementsForm type={FormType.MODIFY} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default StockMovementsPage;
