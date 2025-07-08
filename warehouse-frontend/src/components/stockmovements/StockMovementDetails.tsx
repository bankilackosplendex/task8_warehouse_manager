import "./StockMovementDetails.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { StockMovement } from "../../types/StockMovementType.tsx";
import { getStockMovementById } from "../../services/stockMovementService.tsx";
import {
  CalendarDays,
  Warehouse,
  Container,
  Trash2,
  Pencil,
  Package,
  ArrowLeftRight,
  Briefcase,
} from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import { getWarehouseById } from "../../services/warehouseService.tsx";
import { getProductById } from "../../services/productService.tsx";
import { getCompanyById } from "../../services/companyService.tsx";

function StockMovementsDetails() {
  const { stockMovementId } = useParams();
  const navigate = useNavigate();

  const [stockMovement, setStockMovement] = useState<StockMovement>([]);
  const [error, setError] = useState("");
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

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

  function closeTab(): void {
    setShowPopUpWindow(false);
  }

  function deleteStockMovement(): void {}

  function modifyStockMovement(id: number): void {
    navigate(`/stockmovements/modify/${stockMovement.id}`);
  }

  return (
    // Stckmovement details
    <div className="stockMovementDetails">
      {/* Name */}
      <h2 className="stockMovementDetails__name">
        Stockmovement #{stockMovement.id}
      </h2>
      {/* Product */}
      <div className="stockMovementDetails__product">
        <div className="stockMovementDetails__product__key">
          <Package className="stockMovementDetails__product__key__icon" />
          <p className="stockMovementDetails__product__key__text">Product:</p>
        </div>
        <div className="stockMovementDetails__product__value">
          <Link
            className="stockMovementDetails__product__value__item"
            to={`/products/${stockMovement.product?.id}`}
          >
            <p className="stockMovementDetails__product__value__item__name">
              {stockMovement.product?.name}
            </p>
          </Link>
        </div>
      </div>
      {/* Quantity */}
      <div className="stockMovementDetails__quantity">
        <Container className="stockMovementDetails__quantity__icon" />
        <p className="stockMovementDetails__quantity__key">Quantity: </p>
        <p className="stockMovementDetails__quantity__value">
          {stockMovement.quantity} {stockMovement.product?.quantityType}
        </p>
      </div>
      <div className="stockMovementDetails__movementType">
        <ArrowLeftRight className="stockMovementDetails__movementType__icon" />
        <p className="stockMovementDetails__movementType__key">
          Movement type:
        </p>
        <p className="stockMovementDetails__movementType__value">
          {stockMovement.movementType}
        </p>
      </div>
      {/* Warehouse */}
      <div className="stockMovementDetails__warehouse">
        <div className="stockMovementDetails__warehouse__key">
          <Warehouse className="stockMovementDetails__warehouse__key__icon" />
          <p className="stockMovementDetails__warehouse__key__text">
            Warehouse:
          </p>
        </div>
        <div className="stockMovementDetails__warehouse__value">
          <Link
            className="stockMovementDetails__warehouse__value__item"
            to={`/warehouses/${stockMovement.warehouse?.id}`}
          >
            <p className="stockMovementDetails__warehouse__value__item__name">
              {stockMovement.warehouse?.name}
            </p>
          </Link>
        </div>
      </div>
      {/* Company */}
      <div className="stockMovementDetails__company">
        <div className="stockMovementDetails__company__key">
          <Briefcase className="stockMovementDetails__company__key__icon" />
          <p className="stockMovementDetails__company__key__text">Company:</p>
        </div>
        <div className="stockMovementDetails__company__value">
          <Link
            className="stockMovementDetails__company__value__item"
            to={`/companies/${stockMovement.company?.id}`}
          >
            <p className="stockMovementDetails__company__value__item__name">
              {stockMovement.company?.name}
            </p>
          </Link>
        </div>
      </div>
      {/* Date */}
      <div className="stockMovementDetails__time">
        <CalendarDays className="stockMovementDetails__time__icon" />
        <p className="stockMovementDetails__time__key">Date: </p>
        <p className="stockMovementDetails__time__value">
          {new Date(stockMovement.createdAt).toLocaleDateString()}
        </p>
      </div>
      {/* Options - delete and modify buttons */}
      <div className="stockMovementDetails__optionsContainer">
        <button
          className="stockMovementDetails__optionsContainer__deleteButton"
          onClick={() => setShowPopUpWindow(true)}
        >
          <Trash2 />
        </button>
        <button
          className="stockMovementDetails__optionsContainer__modifyButton"
          onClick={() => modifyStockMovement(stockMovement.id)}
        >
          <Pencil />
        </button>
      </div>
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={
            "Are you sure you want to delete stockmovement #" +
            stockMovement.id +
            "?"
          }
          closePopUpWindow={closeTab}
          deleteItem={deleteStockMovement}
        />
      )}
    </div>
  );
}

export default StockMovementsDetails;
