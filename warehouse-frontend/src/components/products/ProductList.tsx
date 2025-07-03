import { Link } from "react-router-dom";
import "./ProductList.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.tsx";
import { Product } from "../../types/ProductType.tsx";

function ProductList() {
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

  return (
    <div className="product-list">
      {products.map((product) => (
        <Link
          to={`/products/${product.name}`}
          key={product.id}
          className="product-list__item"
        >
          {product.name}
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
