import { Link, Route, Routes } from "react-router-dom";
import StockMovementList from "../../components/stockmovements/StockMovementList.tsx";
import "./StockMovementsPage.scss";
import { SquarePlus } from "lucide-react";
import BackButton from "../../components/common/BackButton.tsx";
import StockMovementDetails from "../../components/stockmovements/StockMovementDetails.tsx";
import StockMovementsForm from "../../components/stockmovements/StockMovementForm.tsx";
import { FormType } from "../../enums/FormTypeEnum.tsx";

function StockMovementsPage() {
  return (
    // Stockmovements page
    <div className="stockmovementsPage">
      <div className="stockmovementsPage__header">
        <BackButton />
      {/* Title */}
      <h2 className="stockmovementsPage__header__title">Stockmovements</h2>
      </div>
      {/* Routes in /stockmovements */}
      <Routes>
        {/* Stockmovement list */}
        <Route path="/" element={<StockMovementList />} />
        {/* Stockmovement details */}
        <Route path="/:stockMovementId" element={<StockMovementDetails />} />
        {/* Stockmovement create form */}
        <Route path="/add" element={<StockMovementsForm type={FormType.CREATE}/>} />
        {/* Stockmovement update form */}
        <Route path="/modify/:stockMovementId" element={<StockMovementsForm type={FormType.MODIFY}/>} />
      </Routes>
    </div>
  );
}

export default StockMovementsPage;
