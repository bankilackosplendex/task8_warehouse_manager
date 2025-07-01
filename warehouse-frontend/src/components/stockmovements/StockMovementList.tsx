import { Link } from "react-router-dom";

function StockMovementsList() {
  return (
    <div>
      StockMovements List
      <Link to="/stockmovements/stockmovement1">Stockmovement 1</Link>
      <Link to="/stockmovements/stockmovement2">Stockmovement 2</Link>
      <Link to="/stockmovements/stockmovement3">Stockmovement 3</Link>
    </div>
  );
}

export default StockMovementsList;
