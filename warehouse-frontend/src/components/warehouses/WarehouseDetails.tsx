import "./WarehouseDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteWarehouse,
  getWarehouseById,
  getWarehouseProductsById,
} from "../../services/warehouseService.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";
import {
  Trash2,
  Pencil,
  MapPin,
  TextIcon,
  Package,
  Truck,
  CalendarDays,
  Tag,
  Container,
  ArrowLeftRight,
} from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import { WarehouseProduct } from "../../types/WarehouseProductType.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

function WarehouseDetails() {
  // --- USER INFO ---
  const { user } = useAuth();

  // --- WAREHOUSE ID URL PARAMETER ---
  const { warehouseId } = useParams();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- WAREHOUSE ENTITY ---
  const [warehouse, setWarehouse] = useState<Warehouse>([]);

  // --- PRODUCTS OF THE WAREHOUSE ---
  const [warehouseProducts, setWarehouseProducts] = useState<
    WarehouseProduct[]
  >([]);

  // --- ERROR ---
  const [error, setError] = useState("");

  // --- SHOW POPUP WINDOW VARIABLE ---
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

  // --- FETCH THE WAREHOUSE'S DATA FROM BACKEND ---
  useEffect(() => {
    const fetchWarehouse = async () => {
      if (warehouseId) {
        try {
          const data = await getWarehouseById(+warehouseId);
          if (!data.movements) data.movements = "-";
          setWarehouse(data);

          const productsData = await getWarehouseProductsById(+warehouseId);
          setWarehouseProducts(productsData);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load warehouse";
          setError(msg);
        }
      }
    };

    fetchWarehouse();
  }, [warehouseId]);

  // --- CLOSE POPUPWINDOW FUNCTION ---
  function closeTab(): void {
    setShowPopUpWindow(false);
  }

  // --- DELETE WAREHOUSE FUNCTION ---
  const onDelete = async () => {
    if (warehouseId) {
      await deleteWarehouse(+warehouseId);
    }
    navigate(`/warehouses`);
  };

  // --- MODIFY WAREHOUSE FUNCTION ---
  function modifyWarehouse(id: number): void {
    navigate(`/warehouses/modify/${warehouse.id}`);
  }

  return (
    // Warehouse details
    <div className="warehouseDetails">
      {/* Name */}
      <h2 className="warehouseDetails__name">{warehouse?.name}</h2>
      {/* Address */}
      <div className="warehouseDetails__address">
        <MapPin className="warehouseDetails__address__icon" />
        <p className="warehouseDetails__address__key">Address: </p>
        <p className="warehouseDetails__address__value">{warehouse?.address}</p>
      </div>
      {/* Description */}
      <div className="warehouseDetails__description">
        <TextIcon className="warehouseDetails__description__icon" />
        <p className="warehouseDetails__description__key">Description: </p>
        <p className="warehouseDetails__description__value">
          {warehouse?.description}
        </p>
      </div>
      {/* Products */}
      {warehouseProducts.length > 0 ? (
        <div className="warehouseDetails__products">
          <div className="warehouseDetails__products__key">
            <Package className="warehouseDetails__products__key__icon" />
            <p className="warehouseDetails__products__key__text">Products:</p>
          </div>
          <div className="warehouseDetails__products__value">
            {/* Header */}
            <div className="warehouseDetails__products__value__header">
              <p className="warehouseDetails__products__value__header__name">
                <Tag />
                Name
              </p>
              <p className="warehouseDetails__products__value__header__quantity">
                <Container />
                Quantity
              </p>
              <p className="warehouseDetails__products__value__header__date">
                <CalendarDays />
                Registered
              </p>
            </div>
            {/* Records */}
            {warehouseProducts.map((warehouseproduct) => (
              <Link
                className="warehouseDetails__products__value__item"
                key={warehouseproduct.id}
                to={`/products/${warehouseproduct.product.id}`}
              >
                <p className="warehouseDetails__products__value__item__name">
                  {warehouseproduct.product.name}
                </p>
                <div className="warehouseDetails__products__value__item__quantity">
                  <p>{warehouseproduct.quantity}</p>
                  <p>{warehouseproduct.product.quantityType}</p>
                </div>
                <p>
                  {new Date(warehouseproduct.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="warehouseDetails__products warehouseDetails__empty">
          <div className="warehouseDetails__products__key">
            <Package className="warehouseDetails__products__key__icon" />
            <p className="warehouseDetails__products__key__text">Products:</p>
          </div>
          <p className="warehouseDetails__products__value">
            This warehouse is empty
          </p>
        </div>
      )}
      {/* Movements */}
      {warehouse.movements && warehouse.movements.length > 0 ? (
        <div className="warehouseDetails__movements">
          <div className="warehouseDetails__movements__key">
            <Truck className="warehouseDetails__movements__key__icon" />
            <p className="warehouseDetails__movements__key__text">Movements:</p>
          </div>
          {/* Header */}
          <div className="warehouseDetails__movements__value">
            <div className="warehouseDetails__movements__value__header">
              <p className="warehouseDetails__movements__value__header__product">
                <Package />
                Product
              </p>
              <p className="warehouseDetails__movements__value__header__quantity">
                <Container />
                Quantity
              </p>
              <p className="warehouseDetails__movements__value__header__movementType">
                <ArrowLeftRight />
                Movement type
              </p>
              <p className="warehouseDetails__movements__value__header__date">
                <CalendarDays />
                Date
              </p>
            </div>
            {/* Records */}
            {warehouse.movements.map((movement) => (
              <Link
                to={`/stockmovements/${movement.id}`}
                className="warehouseDetails__movements__value__item"
                key={movement.id}
              >
                <div className="warehouseDetails__movements__value__item__product">
                  {movement.product?.name}
                </div>
                <div className="warehouseDetails__movements__value__item__quantity">
                  {movement.quantity} {movement.product.quantityType}
                </div>
                <div className="warehouseDetails__movements__value__item__movementType">
                  {movement.movementType}
                </div>
                <div className="warehouseDetails__movements__value__item__date">
                  {new Date(movement.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="warehouseDetails__movements warehouseDetails__empty">
          <div className="warehouseDetails__movements__key">
            <Truck className="warehouseDetails__movements__key__icon" />
            <p className="warehouseDetails__movements__key__text">
              Movements:
            </p>
          </div>
          <div className="warehouseDetails__movements__value">
            This warehouse has no movements
          </div>
        </div>
      )}
      {/* Options */}
      {user?.role === Role.ADMIN && (
        <div className="warehouseDetails__optionsContainer">
          {/* Delete button */}
          <button
            className="warehouseDetails__optionsContainer__deleteButton"
            onClick={() => setShowPopUpWindow(true)}
          >
            <Trash2 />
          </button>
          {/* Modify button */}
          <button
            className="warehouseDetails__optionsContainer__modifyButton"
            onClick={() => modifyWarehouse(warehouse.id)}
          >
            <Pencil />
          </button>
        </div>
      )}
      {/* Backdrop and popup window */}
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={
            "Are you sure you want to delete warahouse " + warehouse.name + "?"
          }
          closePopUpWindow={closeTab}
          deleteItem={onDelete}
        />
      )}
    </div>
  );
}

export default WarehouseDetails;
