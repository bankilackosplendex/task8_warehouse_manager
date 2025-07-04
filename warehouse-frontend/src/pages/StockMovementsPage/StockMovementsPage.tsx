import { Link } from "react-router-dom";
import StockMovementList from "../../components/stockmovements/StockMovementList.tsx";
import "./StockMovementsPage.scss";
import { SquarePlus } from "lucide-react";

function StockMovementsPage() {
  return (
    <div className="stockmovementsPage">
      <h2 className="stockmovementsPage__title">Stockmovements</h2>
      <StockMovementList />
      <Link to="/stockmovements/add">
        <button className="stockmovementsPage__addButton">
          <SquarePlus />
          Add new stockmovement
        </button>
      </Link>
    </div>
  );
}

export default StockMovementsPage;
