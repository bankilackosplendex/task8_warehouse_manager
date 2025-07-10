import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./WarehouseList.scss";
import { getWarehouses } from "../../services/warehouseService.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";
import { FileText, SquarePlus, WarehouseIcon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

function WarehouseList() {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  function onAddButtonClick() {
    navigate("/warehouses/add");
  }

  return (
    <div className="warehouseList">
      {warehouses.map((warehouse) => (
        <Link
          to={`/warehouses/${encodeURIComponent(warehouse.id)}`}
          key={warehouse.id}
          className="warehouseList__item"
        >
          <div className="warehouseList__item__name">
            <WarehouseIcon />
            {warehouse.name}
          </div>
          <div className="warehouseList__item__optionsContainer">
            <button
              className="warehouseList__item__optionsContainer__reportButton"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/reports/${warehouse.id}`);
              }}
            >
              <FileText />
            </button>
          </div>
        </Link>
      ))}
      {user?.role === Role.ADMIN && (
        <button
          className="warehouseList__addButton"
          onClick={() => onAddButtonClick()}
        >
          <SquarePlus />
          Add new warehouse
        </button>
      )}
    </div>
  );
}

export default WarehouseList;
