import { Link } from "react-router-dom";
import StockMovementList from "../../components/stockmovements/StockMovementList.tsx";
import "./StockMovementsPage.scss";

function StockMovementsPage() {
  return (
    <div className="stockmovementsPage">
      <h2 className="stockmovementsPage__title">Stockmovements</h2>
      <StockMovementList />
      <Link to="/stockmovements/add">
        <button className="stockmovementsPage__addButton">Add new stockmovement</button>
      </Link>
    </div>
  );
}

export default StockMovementsPage;
