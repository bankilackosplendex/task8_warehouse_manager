import { Link } from "react-router-dom";
import "./StockMovementList.scss";

function StockMovementsList() {
  const stockmovements = [
    { id: "1", name: "Stockmovement from Pécs to Budapest" },
    { id: "2", name: "Shipping from Spain to Szeged warehouse" },
    { id: "3", name: "Stockmovement from Szeged to Pécs" },
  ];

  return (
    <div className="stockmovement-list">
      {stockmovements.map((stockmovement) => (
        <Link
          to={`/warehouses/${stockmovement.name}`}
          key={stockmovement.id}
          className="warehouse-list__item"
        >
          {stockmovement.name}
        </Link>
      ))}
    </div>
  );
}

export default StockMovementsList;
