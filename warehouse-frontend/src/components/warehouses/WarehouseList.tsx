import { Link } from "react-router-dom";
import "./WarehouseList.scss";

function WarehouseList() {
  const warehouses = [
    { id: "1", name: "Budapest warehouse" },
    { id: "2", name: "Pécs warehouse" },
    { id: "3", name: "Szeged warehouse" },
  ];

  return (
    <div className="warehouse-list">
      {warehouses.map((warehouse) => (
        <Link
          to={`/warehouses/${warehouse.name}`}
          key={warehouse.id}
          className="warehouse-list__item"
        >
          {warehouse.name}
        </Link>
      ))}
    </div>
  );
}

export default WarehouseList;
