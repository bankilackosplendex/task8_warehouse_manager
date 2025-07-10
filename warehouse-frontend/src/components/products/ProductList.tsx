import { Link, useNavigate } from "react-router-dom";
import "./ProductList.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.tsx";
import { Product } from "../../types/ProductType.tsx";
import { Package, PackagePlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

function ProductList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load products";
        setError(msg);
      }
    };

    fetchProducts();
  }, []);

  function onAddButtonClick() {
    navigate("/products/add");
  }

  return (
    <div className="productList">
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
