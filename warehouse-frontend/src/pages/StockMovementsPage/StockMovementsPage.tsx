import { Link, Route, Routes } from "react-router-dom";
import StockMovementList from "../../components/stockmovements/StockMovementList.tsx";
import "./StockMovementsPage.scss";
import { SquarePlus } from "lucide-react";
import BackButton from "../../components/common/BackButton.tsx";
import StockMovementDetails from "../../components/stockmovements/StockMovementDetails.tsx";
import StockMovementsForm from "../../components/stockmovements/StockMovementForm.tsx";

function StockMovementsPage() {
  return (
    // Stockmovements page
    <div className="stockmovementsPage">
      <BackButton />
      {/* Title */}
      <h2 className="stockmovementsPage__title">Stockmovements</h2>
      {/* Routes in /stockmovements */}
      <Routes>
        {/* Stockmovement list */}
        <Route path="/" element={<StockMovementList />} />
        {/* Stockmovement details */}
        <Route path="/:stockMovementId" element={<StockMovementDetails />} />
        {/* Stockmovement create form */}
        <Route path="/add" element={<StockMovementsForm />} />
      </Routes>
    </div>
  );
}

export default StockMovementsPage;
