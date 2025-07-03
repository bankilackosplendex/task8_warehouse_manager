import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./WarehouseList.scss";
import { getWarehouses } from "../../services/warehouseService.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";

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
    <div className="warehouse-list">
      {warehouses.map((warehouse) => (
        <Link
          to={`/warehouses/${encodeURIComponent(warehouse.id)}`}
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
