import { Link } from "react-router-dom";
import "./StockMovementList.scss";
import { useEffect, useState } from "react";
import { StockMovement } from "../../types/StockMovementType";
import { getStockMovements } from "../../services/stockMovementService.tsx";
import { getProductById } from "../../services/productService.tsx";
import { getWarehouseById } from "../../services/warehouseService.tsx";
import { getCompanyById } from "../../services/companyService.tsx";
import { Truck } from "lucide-react";

function StockMovementsList() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [error, setError] = useState("");

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
          <div className="stockmovement-list__item__id">
            <Truck />
            <p>#{stockmovement.id}</p>
            <p>{stockmovement.warehouse.name}</p>
            <p>{stockmovement.product.name}</p>
          </div>
          <div className="stockmovement-list__item__info">
            <p>{stockmovement.movementType}</p>
            <p>{new Date(stockmovement.createdAt).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default StockMovementsList;
