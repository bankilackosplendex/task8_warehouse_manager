import "./StockMovementForm.scss";
import {
  ArrowRightLeft,
  Briefcase,
  CalendarDays,
  Container,
  Package,
  Save,
  SquarePlus,
  WarehouseIcon,
} from "lucide-react";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useEffect } from "react";
import { getCompanies } from "../../services/companyService.tsx";
import { getProducts } from "../../services/productService.tsx";
import {
  createStockMovement,
  getStockMovementById,
  updateStockMovement,
} from "../../services/stockMovementService.tsx";
import {
  addProductToWarehouse,
  getWarehouses,
} from "../../services/warehouseService.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { StockMovement } from "../../types/StockMovementType.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";
import { Product } from "../../types/ProductType.tsx";
import { Company } from "../../types/CompanyType.tsx";
import ErrorWindow from "../common/ErrorWindow.tsx";
import { WarehouseProduct } from "../../types/WarehouseProductType.tsx";
import { MovementType } from "../../enums/MovementTypeEnum.tsx";

function StockMovementsForm({ type }: { type: FormType }) {
  // --- MOVEMENT ID URL PARAMETER ---
  const { stockMovementId } = useParams();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- MOVEMENT ENTITY ---
  const [stockMovement, setStockMovement] = useState<StockMovement>([]);

  // --- LIST OF WAREHOUSES ---
  const [warehouses, setWarehouses] = useState<Warehouse>([]);

  // --- LIST OF PRODUCTS ---
  const [products, setProducts] = useState<Product>([]);

  // --- LIST OF COMPANIES ---
  const [companies, setCompanies] = useState<Company>([]);

  // --- ERROR ---
  const [error, setError] = useState("");
  const [statusCode, setSatusCode] = useState<number>();

  // --- FETCH THE MOVEMENT'S DATA FROM BACKEND ---
  useEffect(() => {
    const fetchStockMovement = async () => {
      try {
        if (stockMovementId) {
          const data = await getStockMovementById(+stockMovementId);
          setStockMovement(data);
        }
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
        setSatusCode(503);
      }
    };

    fetchStockMovement();
  }, []);

  // --- CREATE/MODIFY MOVEMENT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (type == FormType.CREATE) {
        console.log(stockMovement);
        await createStockMovement(stockMovement);

        const warehouseProduct: WarehouseProduct = {
          quantity: stockMovement.quantity,
          createdAt: stockMovement.createdAt,
          warehouseId: stockMovement.warehouseId,
          productId: stockMovement.productId,
        };

        if (stockMovement.movementType === MovementType.IMPORT) {
          await addProductToWarehouse(warehouseProduct);
        }
      } else if (type == FormType.MODIFY && stockMovementId) {
        const cleanedStockMovement = { ...stockMovement };
        delete cleanedStockMovement.id;
        delete cleanedStockMovement.product;
        delete cleanedStockMovement.warehouse;
        delete cleanedStockMovement.company;

        await updateStockMovement(+stockMovementId, cleanedStockMovement);
      }

      navigate("/stockmovements");
    } catch (err: any) {
      console.error("Stockmovement operation failed", err);
      if (err.response && err.response.data && err.response.data.message) {
        const msg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message;
        setError(msg);
      } else {
        setError("Unknown error");
      }
    }
  };

  // --- FORMAT DATE FUNCTION ---
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

  // --- SET PRODUCT WITH THE INPUT VALUE FUNCTION ---
  function setProduct(productId: string): void {
    setStockMovement((prev) => ({ ...prev, productId: +productId }));
  }

  // --- SET QUANTITY WITH THE SELECTED VALUE FUNCTION ---
  function setQuantity(q: string): void {
    setStockMovement((prev) => ({ ...prev, quantity: +q }));
  }

  // --- SET WAREHOUSE WITH THE SELECTED VALUE FUNCTION ---
  function setWarehouse(warehouseId: string): void {
    setStockMovement((prev) => ({ ...prev, warehouseId: +warehouseId }));
  }

  // --- SET COMPANY WITH THE SELECTED VALUE FUNCTION ---
  function setCompany(companyId: string): void {
    setStockMovement((prev) => ({ ...prev, companyId: +companyId }));
  }

  // --- SET MOVEMENT TYPE WITH THE SELECTED VALUE FUNCTION ---
  function setMovementType(movementType: string): void {
    setStockMovement((prev) => ({ ...prev, movementType }));
  }

  // --- SET DATE WITH THE SELECTED VALUE FUNCTION ---
  function setDate(dateStr: string): void {
    const isoDate = new Date(dateStr).toISOString();
    setStockMovement((prev) => ({ ...prev, createdAt: isoDate }));
  }

  if (error)
    return (
      // Error window
      <ErrorWindow
        text={error}
        statusCode={statusCode}
        onClose={() => setError("")}
      />
    );

  return (
    // StockMovements form
    <form className="stockMovementsForm" onSubmit={handleSubmit}>
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
        onChange={(e) => setProduct(e.target.value)}
        required
      >
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      {/* Quantity */}
      <label className="stockMovementsForm__quantityLabel" htmlFor="quantrity">
        <Container className="stockMovementsForm__quantityLabel__icon" />
        Quantity {stockMovement.product?.quantityType}
      </label>
      <input
        className="stockMovementsForm__quantityField"
        type="text"
        name="quantity"
        defaultValue={stockMovement?.quantity ? stockMovement.quantity : ""}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
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
        onChange={(e) => setMovementType(e.target.value)}
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
        onChange={(e) => setWarehouse(e.target.value)}
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
        onChange={(e) => setCompany(e.target.value)}
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
        onChange={(e) => setDate(e.target.value)}
      />
      <button className="stockMovementsForm__button" type="submit">
        {/* Add button */}
        {type == FormType.CREATE && (
          <>
            <SquarePlus />
            Add
          </>
        )}
        {/* Save button */}
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
