import StockMovementList from "../../components/stockmovements/StockMovementList.tsx";
import "./StockMovementsPage.scss";

function StockMovementsPage() {
  return (
    <div className="stockmovementsPage">
      <h2 className="stockmovementsPage__title">Stockmovements</h2>
      <StockMovementList />
    </div>
  );
}

export default StockMovementsPage;
