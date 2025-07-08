import "./WarehouseDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
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
} from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import { WarehouseProduct } from "../../types/WarehouseProductType.tsx";

function WarehouseDetails() {
  const { warehouseId } = useParams();
  const navigate = useNavigate();

  const [warehouse, setWarehouse] = useState<Warehouse>([]);
  const [warehouseProducts, setWarehouseProducts] = useState<
    WarehouseProduct[]
  >([]);
  const [error, setError] = useState("");
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

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
  }, []);

  function closeTab(): void {
    setShowPopUpWindow(false);
  }

  function deleteWarehouse(): void {}

  function modifyWarehouse(id: number): void {
    navigate(`/warehouses/modify/${warehouse.id}`);
  }

  return (
    <div className="warehouseDetails">
      <h2 className="warehouseDetails__name">{warehouse?.name}</h2>
      <div className="warehouseDetails__address">
        <MapPin className="warehouseDetails__address__icon" />
        <p className="warehouseDetails__address__key">Address: </p>
        <p className="warehouseDetails__address__value">{warehouse?.address}</p>
      </div>
      <div className="warehouseDetails__description">
        <TextIcon className="warehouseDetails__description__icon" />
        <p className="warehouseDetails__description__key">Description: </p>
        <p className="warehouseDetails__description__value">
          {warehouse?.description}
        </p>
      </div>
      <div className="warehouseDetails__products">
        {warehouseProducts.length > 0 ? (
          <>
            <div className="warehouseDetails__products__key">
              <Package className="warehouseDetails__products__key__icon" />
              <p className="warehouseDetails__products__key__text">Products:</p>
            </div>
            <div className="warehouseDetails__products__value">
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
          </>
        ) : (
          <div className="warehouseDetails__products__key">
            <Package className="warehouseDetails__products__key__icon" />
            <p className="warehouseDetails__products__key__text">Products:</p>
            <p className="warehouseDetails__products__value">This warehouse is empty</p>
          </div>
        )}
      </div>
      <div className="warehouseDetails__movements">
        <Truck className="warehouseDetails__movements__icon" />
        <p className="warehouseDetails__movements__key">Movements: </p>
        <p className="warehouseDetails__movements__value">
          {warehouse.movements}
        </p>
      </div>
      <div className="warehouseDetails__optionsContainer">
        <button
          className="warehouseDetails__optionsContainer__deleteButton"
          onClick={() => setShowPopUpWindow(true)}
        >
          <Trash2 />
        </button>
        <button
          className="warehouseDetails__optionsContainer__modifyButton"
          onClick={() => modifyWarehouse(warehouse.id)}
        >
          <Pencil />
        </button>
      </div>
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={
            "Are you sure you want to delete warahouse " + warehouse.name + "?"
          }
          closePopUpWindow={closeTab}
          deleteItem={deleteWarehouse}
        />
      )}
    </div>
  );
}

export default WarehouseDetails;
