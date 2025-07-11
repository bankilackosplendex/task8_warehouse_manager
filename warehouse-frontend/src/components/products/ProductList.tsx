import "./ProductList.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.tsx";
import { Product } from "../../types/ProductType.tsx";
import { Package, PackagePlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";
import ErrorWindow from "../common/ErrorWindow.tsx";

function ProductList() {
  // --- USER INFO ---
  const { user } = useAuth();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- PRODUCT ENTITIES ---
  const [products, setProducts] = useState<Product[]>([]);

  // --- ERROR ---
  const [error, setError] = useState("");
  const [statusCode, setSatusCode] = useState<number>();

  // --- FETCH THE PRODUCTS DATA FROM BACKEND ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load products";
        setError(msg);
        setSatusCode(503);
      }
    };

    fetchProducts();
  }, []);

  // --- ADD PRODUCT FUNCTION ---
  function onAddButtonClick() {
    navigate("/products/add");
  }

  if (error)
    return (
      // Error window
      <ErrorWindow text={error} statusCode={statusCode} onClose={() => setError("")} />
    );

  return (
    // Product list
    <div className="productList">
      {/* Product records */}
      {products.map((product) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="productList__item"
        >
          <Package />
          {product.name}
        </Link>
      ))}
      {/* Add button */}
      {user?.role === Role.ADMIN && (
        <button
          className="productList__addButton"
          onClick={() => onAddButtonClick()}
        >
          <PackagePlus />
          Add new product
        </button>
      )}
    </div>
  );
}

export default ProductList;
