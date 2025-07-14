import "./ProductDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../types/ProductType";
import {
  deleteProduct,
  getProductById,
  getProductWarehousesById,
} from "../../services/productService.tsx";
import {
  CalendarDays,
  Container,
  FileDigit,
  Pencil,
  Ruler,
  SquarePlus,
  Tag,
  Trash2,
  Truck,
  Warehouse,
} from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import { QuantityType } from "../../enums/QuantityTypeEnum.tsx";
import { WarehouseProduct } from "../../types/WarehouseProductType.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import ErrorWindow from "../common/ErrorWindow.tsx";

function ProductDetails() {
  // --- USER INFO ---
  const { user } = useAuth();

  // --- PRODUCT ID URL PARAMETER ---
  const { productId } = useParams();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- PRODUCT ENTITY ---
  const [product, setProduct] = useState<Product>([]);

  // --- WAREHOUSES OF THE PRODUCT ---
  const [warehouseProducts, setWarehouseProducts] = useState<
    WarehouseProduct[]
  >([]);

  // --- ERROR ---
  const [error, setError] = useState("");
  const [statusCode, setSatusCode] = useState<number>();

  // --- SHOW POPUP WINDOW VARIABLE ---
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

  // --- FETCH THE PRODUCT'S DATA FROM BACKEND ---
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const data = await getProductById(+productId);
          setProduct(data);

          const warehousesData = await getProductWarehousesById(+productId);
          setWarehouseProducts(warehousesData);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load product";
          setError(msg);
          setSatusCode(503);
        }
      } else {
        const data = {
          name: "",
          number: null,
          quantityType: QuantityType.DB,
        };
        setProduct(data);
      }
    };

    fetchProduct();
  }, []);

  // --- CLOSE POPUPWINDOW FUNCTION ---
  function closeTab(): void {
    setShowPopUpWindow(false);
  }

  // --- DELETE PRODUCT FUNCTION ---
  const onDelete = async () => {
    if (productId) {
      await deleteProduct(+productId);
    }
    navigate(`/products`);
  };

  // --- MODIFY PRODUCT FUNCTION ---
  function modifyProduct(id: number): void {
    navigate(`/products/modify/${product.id}`);
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
    // Product details
    <div className="productDetails">
      {/* Name */}
      <h2 className="productDetails__name">{product.name}</h2>
      {/* Article number */}
      <div className="productDetails__number">
        <FileDigit className="productDetails__number__icon" />
        <p className="productDetails__number__key">Article number: </p>
        <p className="productDetails__number__value">{product.number}</p>
      </div>
      {/* Quantity type */}
      <div className="productDetails__quantityType">
        <Ruler className="productDetails__quantityType__icon" />
        <p className="productDetails__quantityType__key">Quantity type: </p>
        <p className="productDetails__quantityType__value">
          {product.quantityType}
        </p>
      </div>
      {/* Creation time */}
      <div className="productDetails__time">
        <CalendarDays className="productDetails__time__icon" />
        <p className="productDetails__time__key">Created at: </p>
        <p className="productDetails__time__value">
          {new Date(product.createdAt).toLocaleDateString()}
        </p>
      </div>
      {/* Warehouses */}
      {warehouseProducts.length > 0 ? (
        <div className="productDetails__warehouses">
          <div className="productDetails__warehouses__key">
            <Warehouse className="productDetails__warehouses__key__icon" />
            <p className="productDetails__warehouses__key__text">Warehouses:</p>
          </div>
          <div className="productDetails__warehouses__value">
            {/* Header */}
            <div className="productDetails__warehouses__value__header">
              <p className="productDetails__warehouses__value__header__name">
                <Tag />
                Name
              </p>
              <p className="productDetails__warehouses__value__header__quantity">
                <Container />
                Quantity
              </p>
              <p className="productDetails__warehouses__value__header__date">
                <CalendarDays />
                Registered
              </p>
            </div>
            {/* Records */}
            {warehouseProducts.map((warehouseproduct) => (
              <Link
                className="productDetails__warehouses__value__item"
                key={warehouseproduct.id}
                to={`/warehouses/${warehouseproduct.warehouse.id}`}
              >
                <p className="productDetails__warehouses__value__item__name">
                  {warehouseproduct.warehouse.name}
                </p>
                <div className="productDetails__warehouses__value__item__quantity">
                  <p>{warehouseproduct.quantity}</p>
                  <p>{product.quantityType}</p>
                </div>
                <p>
                  {new Date(warehouseproduct.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="productDetails__warehouses productDetails__empty">
          <div className="productDetails__warehouses__key">
            <Warehouse className="productDetails__warehouses__key__icon" />
            <p className="productDetails__warehouses__key__text">Warehouses:</p>
          </div>
          <p className="productDetails__warehouses__value">
            This product is not stored in any of the warehouses
          </p>
        </div>
      )}
      {/* Options */}
      {user?.role === Role.ADMIN && (
        <div className="productDetails__optionsContainer">
          {/* Delete button */}
          <button
            className="productDetails__optionsContainer__deleteButton"
            onClick={() => setShowPopUpWindow(true)}
          >
            <Trash2 />
          </button>
          {/* Modify button */}
          <button
            className="productDetails__optionsContainer__modifyButton"
            onClick={() => modifyProduct(product.id)}
          >
            <Pencil />
          </button>
          {/* Add movement button */}
          <button
            className="productDetails__optionsContainer__addMovementButton"
            onClick={() => navigate("/stockmovements/add")}
          >
            <SquarePlus className="productDetails__optionsContainer__addMovementButton__icon" />
            <Truck className="productDetails__optionsContainer__addMovementButton__icon" />
          </button>
        </div>
      )}
      {/* Backdrop and popup window */}
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={"Are you sure you want to delete product " + product.name + "?"}
          closePopUpWindow={closeTab}
          deleteItem={onDelete}
        />
      )}
    </div>
  );
}

export default ProductDetails;
