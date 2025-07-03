import { Link } from "react-router-dom";
import "./StockMovementList.scss";
import { useEffect, useState } from "react";
import { StockMovement } from "../../types/StockMovementType";
import { getStockMovements } from "../../services/stockMovementService.tsx";
import { getProductById } from "../../services/productService.tsx";
import { getWarehouseById } from "../../services/warehouseService.tsx";
import { getCompanyById } from "../../services/companyService.tsx";

function StockMovementsList() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockMovement = async () => {
      try {
        const data = await getStockMovements();
        setStockMovements(data);
        await data.map(
          async (stockMov) => (
            (stockMov.product = await getProduct(stockMov.productId)),
            (stockMov.warehouse = await getWarehouse(stockMov.warehouseId)),
            (stockMov.company = await getCompany(stockMov.companyId))
          )
        );
        setStockMovements(data);
      } catch (err: any) {
        const msg =
          err.response?.data?.message || "Couldn't load stockmovements";
        setError(msg);
      }
    };

    fetchStockMovement();
  }, []);

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

  return (
    <div className="stockmovement-list">
      {stockMovements.map((stockmovement) => (
        <Link
          to={`/stockmovements/${stockmovement.id}`}
          key={stockmovement.id}
          className="stockmovement-list__item"
        >
          <div className="stockmovement-list__item__id">#{stockmovement.id}</div>
          <div className="stockmovement-list__item__info">
            <p>{stockmovement.movementType}</p> 
            <p>{new Date(stockmovement.createdAt).toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default StockMovementsList;
