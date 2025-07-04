import "./WarehouseDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWarehouseById } from "../../services/warehouseService.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";
import { Trash2, Pencil } from "lucide-react";

function WarehouseDetails() {
  const { warehouseId } = useParams();

  const [warehouse, setWarehouse] = useState<Warehouse>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWarehouse = async () => {
      if (warehouseId) {
        try {
          const data = await getWarehouseById(+warehouseId);
          if(!data.products) data.products = "-";
          if(!data.movements) data.movements = "-";
          setWarehouse(data);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load warehous";
          setError(msg);
        }
      }
    };

    fetchWarehouse();
  }, []);

  return (
    <div className="warehouseDetails">
      <h2 className="warehouseDetails__name" >{warehouse.name}</h2>
      <div className="warehouseDetails__address">
        <p className="warehouseDetails__address__key">Address: </p> 
        <p className="warehouseDetails__address__value">{warehouse.address}</p>
      </div>
      <div className="warehouseDetails__description">
        <p className="warehouseDetails__description__key">Description: </p>
        <p className="warehouseDetails__description__value">{warehouse.description}</p>
      </div>
      <div className="warehouseDetails__products">
        <p className="warehouseDetails__products__key">Products: </p>
        <p className="warehouseDetails__products__value">{warehouse.products}</p>
      </div>
      <div className="warehouseDetails__movements">
        <p className="warehouseDetails__movements__key">Movements: </p>
        <p className="warehouseDetails__movements__value">{warehouse.movements}</p>
      </div>
      <div className="warehouseDetails__optionsContainer">
        <button className="warehouseDetails__optionsContainer__deleteButton">
          <Trash2 />
        </button>
        <button className="warehouseDetails__optionsContainer__deleteButton">
          <Pencil />
        </button>
      </div>
    </div>
  );
}

export default WarehouseDetails;
