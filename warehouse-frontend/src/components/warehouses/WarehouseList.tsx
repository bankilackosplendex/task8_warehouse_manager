import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./WarehouseList.scss";
import { getWarehouses } from "../../services/warehouseService.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";
import { SquarePlus, WarehouseIcon } from "lucide-react";

function WarehouseList() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const data = await getWarehouses();
        setWarehouses(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load warehouses";
        setError(msg);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div className="warehouseList">
      {warehouses.map((warehouse) => (
        <Link
          to={`/warehouses/${encodeURIComponent(warehouse.id)}`}
          key={warehouse.id}
          className="warehouseList__item"
        >
          <WarehouseIcon />
          {warehouse.name}
        </Link>
      ))}
      <Link to="/add">
        <button className="warehouseList__addButton">
          <SquarePlus />
          Add new warehouse
        </button>
      </Link>
    </div>
  );
}

export default WarehouseList;
