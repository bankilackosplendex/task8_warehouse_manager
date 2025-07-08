import "./ProductDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../types/ProductType";
import {
  getProductById,
  getProductWarehousesById,
} from "../../services/productService.tsx";
import {
  CalendarDays,
  Container,
  Divide,
  FileDigit,
  Pencil,
  Ruler,
  Tag,
  Trash2,
  Warehouse,
} from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import { QuantityType } from "../../enums/QuantityTypeEnum.tsx";
import { WarehouseProduct } from "../../types/WarehouseProductType.tsx";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>([]);
  const [warehouseProducts, setWarehouseProducts] = useState<
    WarehouseProduct[]
  >([]);
  const [error, setError] = useState("");
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

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

  function closeTab(): void {
    setShowPopUpWindow(false);
  }

  function deleteProduct(): void {}

  function modifyProduct(id: number): void {
    navigate(`/products/modify/${product.id}`);
  }

  return (
    <div className="productDetails">
      <h2 className="productDetails__name">{product.name}</h2>
      <div className="productDetails__number">
        <FileDigit className="productDetails__number__icon" />
        <p className="productDetails__number__key">Article number: </p>
        <p className="productDetails__number__value">{product.number}</p>
      </div>
      <div className="productDetails__quantityType">
        <Ruler className="productDetails__quantityType__icon" />
        <p className="productDetails__quantityType__key">Quantity type: </p>
        <p className="productDetails__quantityType__value">
          {product.quantityType}
        </p>
      </div>
      <div className="productDetails__time">
        <CalendarDays className="productDetails__time__icon" />
        <p className="productDetails__time__key">Created at: </p>
        <p className="productDetails__time__value">
          {new Date(product.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="productDetails__warehouses">
        {warehouseProducts.length > 0 ? (
          <>
            <div className="productDetails__warehouses__key">
              <Warehouse className="productDetails__warehouses__key__icon" />
              <p className="productDetails__warehouses__key__text">
                Warehouses:
              </p>
            </div>
            <div className="productDetails__warehouses__value">
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
          </>
        ) : (
          <div className="productDetails__warehouses__key">
            <Warehouse className="productDetails__warehouses__key__icon" />
            <p className="productDetails__warehouses__key__text">Warehouses:</p>
            <p className="productDetails__warehouses__value">
              This product is not stored in any of the warehouses
            </p>
          </div>
        )}
      </div>
      <div className="productDetails__optionsContainer">
        <button
          className="productDetails__optionsContainer__deleteButton"
          onClick={() => setShowPopUpWindow(true)}
        >
          <Trash2 />
        </button>
        <button
          className="productDetails__optionsContainer__modifyButton"
          onClick={() => modifyProduct(product.id)}
        >
          <Pencil />
        </button>
      </div>
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={"Are you sure you want to delete product " + product.name + "?"}
          closePopUpWindow={closeTab}
          deleteItem={deleteProduct}
        />
      )}
    </div>
  );
}

export default ProductDetails;
