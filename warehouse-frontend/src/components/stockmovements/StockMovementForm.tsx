import {
  ArrowRightLeft,
  Briefcase,
  CalendarDays,
  Package,
  Save,
  SquarePlus,
  WarehouseIcon,
} from "lucide-react";
import "./StockMovementForm.scss";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useEffect } from "react";
import {
  getCompanies,
  getCompanyById,
} from "../../services/companyService.tsx";
import { getProductById, getProducts } from "../../services/productService.tsx";
import { getStockMovementById } from "../../services/stockMovementService.tsx";
import {
  getWarehouseById,
  getWarehouses,
} from "../../services/warehouseService.tsx";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { StockMovement } from "../../types/StockMovementType.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";
import { Product } from "../../types/ProductType.tsx";
import { Company } from "../../types/CompanyType.tsx";

function StockMovementsForm({ type }: { type: FormType }) {
  const { stockMovementId } = useParams();

  const [stockMovement, setStockMovement] = useState<StockMovement>([]);
  const [warehouses, setWarehouses] = useState<Warehouse>([]);
  const [products, setProducts] = useState<Product>([]);
  const [companies, setCompanies] = useState<Company>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockMovement = async () => {
      if (stockMovementId) {
        try {
          const data = await getStockMovementById(+stockMovementId);
          if (data.productId)
            data.product = await getProductById(data.productId);
          if (data.warehouseId)
            data.warehouse = await getWarehouseById(data.warehouseId);
          if (data.companyId)
            data.company = await getCompanyById(data.companyId);
          setStockMovement(data);

          const productsData = await getProducts();
          setProducts(productsData);

          const warehousesData = await getWarehouses();
          setWarehouses(warehousesData);

          const companiesData = await getCompanies();
          setCompanies(companiesData);
        } catch (err: any) {
          const msg =
            err.response?.data?.message || "Couldn't load stockmovement";
          setError(msg);
        }
      } else {
        const data = {};
        setStockMovement(data);
      }
    };

    fetchStockMovement();
  }, []);

  function formatDateForInput(dateStr: string) {
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    // StockMovements form
    <form className="stockMovementsForm" method="post">
      {/* Title */}
      {type == FormType.CREATE && (
        <>
          <h2 className="stockMovementsForm__title">Add new stockmovement</h2>
        </>
      )}
      {type == FormType.MODIFY && (
        <>
          <h2 className="stockMovementsForm__title">Update stockmovement</h2>
        </>
      )}
      {/* Product */}
      <label className="stockMovementsForm__productLabel" htmlFor="product">
        <Package className="stockMovementsForm__productLabel__icon" />
        Product
      </label>
      <select
        className="stockMovementsForm__productField"
        name="product"
        defaultValue={
          stockMovement.product?.id ? stockMovement.product?.id : ""
        }
        required
      >
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      {/* Movement type */}
      <label
        className="stockMovementsForm__movementTypeLabel"
        htmlFor="movementType"
      >
        <ArrowRightLeft className="stockMovementsForm__movementTypeLabel__icon" />
        Movement type
      </label>
      <select
        className="stockMovementsForm__movementTypeField"
        name="movementType"
        defaultValue={
          stockMovement.movementType ? stockMovement.movementType : "IMPORT"
        }
        required
      >
        <option value="IMPORT">IMPORT</option>
        <option value="EXPORT">EXPORT</option>
      </select>
      {/* Warehouse */}
      <label className="stockMovementsForm__warehouseLabel" htmlFor="warehouse">
        <WarehouseIcon className="stockMovementsForm__warehouseLabel__icon" />
        Warehouse
      </label>
      <select
        className="stockMovementsForm__warehouseField"
        name="warehouse"
        defaultValue={
          stockMovement.warehouse?.id ? stockMovement.warehouse?.id : ""
        }
        required
      >
        {warehouses.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </select>
      {/* Company */}
      <label className="stockMovementsForm__companyLabel" htmlFor="company">
        <Briefcase className="stockMovementsForm__companyLabel__icon" />
        Company
      </label>
      <select
        className="stockMovementsForm__companyField"
        name="company"
        defaultValue={
          stockMovement.company?.id ? stockMovement.company?.id : ""
        }
        required
      >
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      {/* Date */}
      <label className="stockMovementsForm__dateLabel" htmlFor="date">
        <CalendarDays className="stockMovementsForm__dateLabel__icon" />
        Date
      </label>
      <input
        className="stockMovementsForm__dateField"
        type="datetime-local"
        name="date"
        defaultValue={
          stockMovement.createdAt
            ? formatDateForInput(stockMovement.createdAt)
            : ""
        }
        required
      />
      {/* Add button */}
      <button className="stockMovementsForm__button" type="submit">
        {type == FormType.CREATE && (
          <>
            <SquarePlus />
            Add
          </>
        )}
        {type == FormType.MODIFY && (
          <>
            <Save />
            Save
          </>
        )}
      </button>
    </form>
  );
}

export default StockMovementsForm;
