import "./StockMovementList.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StockMovement } from "../../types/StockMovementType";
import { getStockMovements } from "../../services/stockMovementService.tsx";
import { getProductById } from "../../services/productService.tsx";
import { getWarehouseById } from "../../services/warehouseService.tsx";
import { getCompanyById } from "../../services/companyService.tsx";
import { ArrowLeftRight, CalendarDays, Package, SquarePlus, Truck, Warehouse } from "lucide-react";
import { Role } from "../../enums/UserRoleEnum.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

function StockMovementsList() {
  // --- USER INFO ---
  const { user } = useAuth();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- MOVEMENT ENTITIES ---
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  // --- ERROR ---
  const [error, setError] = useState("");

  // --- FETCH THE MOVEMENTS DATA FROM BACKEND ---
  useEffect(() => {
    const fetchStockMovement = async () => {
      try {
        const data = await getStockMovements();

        const enrichedData = await Promise.all(
          data.map(async (stockMov) => {
            const [product, warehouse, company] = await Promise.all([
              getProduct(stockMov.productId),
              getWarehouse(stockMov.warehouseId),
              getCompany(stockMov.companyId),
            ]);

            return {
              ...stockMov,
              product,
              warehouse,
              company,
            };
          })
        );

        setStockMovements(enrichedData);
      } catch (err: any) {
        const msg =
          err.response?.data?.message || "Couldn't load stock movements";
        setError(msg);
      }
    };

    fetchStockMovement();
  }, []);

  // --- FETCH THE PRODUCT DATA FROM BACKEND ---
  const getProduct = async (id: number) => {
    if (!id) return null;
    try {
      const product = await getProductById(id);
      return product;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Couldn't load product";
      setError(msg);
    }
  };

  // --- FETCH THE WAREHOUSE DATA FROM BACKEND ---
  const getWarehouse = async (id: number) => {
    if (!id) return null;
    try {
      const warehouse = await getWarehouseById(id);
      return warehouse;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Couldn't load warehouse";
      setError(msg);
    }
  };

  // --- FETCH THE COMPANY DATA FROM BACKEND ---
  const getCompany = async (id: number) => {
    if (!id) return null;
    try {
      const company = await getCompanyById(id);
      return company;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Couldn't load company";
      setError(msg);
    }
  };

  // --- ADD MOVEMENT FUNCTION ---
  function onAddButtonClick() {
    navigate("/stockmovements/add");
  }

  return (
    // Movement List
    <div className="stockmovementList">
      {/* Header */}
      <div className="stockmovementList__header">
        <div className="stockmovementList__header__warehouse">
            <Warehouse />
            Warehouse
          </div>
          <div className="stockmovementList__header__product">
            <Package />
            Product
          </div>
          <div className="stockmovementList__header__movementType">
            <ArrowLeftRight />
            Direction
          </div>
          <div className="stockmovementList__header__date">
            <CalendarDays />
            Date
          </div>
      </div>
      {/* Movement records */}
      {stockMovements.map((stockmovement) => (
        <Link
          to={`/stockmovements/${stockmovement.id}`}
          key={stockmovement.id}
          className="stockmovementList__item"
        >
          <div className="stockmovementList__item__warehouse">
            <Truck />
            {stockmovement.warehouse.name}
          </div>
          <div className="stockmovementList__item__product">
            {stockmovement.product.name}
          </div>
          <div className="stockmovementList__item__movementType">
            {stockmovement.movementType}
          </div>
          <div className="stockmovementList__item__date">
            {new Date(stockmovement.createdAt).toLocaleDateString()}
          </div>
        </Link>
      ))}
      {/* Add button */}
      {user?.role === Role.ADMIN && (
        <button
          className="stockmovementList__addButton"
          onClick={() => onAddButtonClick()}
        >
          <SquarePlus />
          Add new stockmovement
        </button>
      )}
    </div>
  );
}

export default StockMovementsList;
