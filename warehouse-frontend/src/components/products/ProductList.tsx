import { Link } from "react-router-dom";
import "./ProductList.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.tsx";
import { Product } from "../../types/ProductType.tsx";
import { Package, PackagePlus } from "lucide-react";

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
      <Link to="add">
        <button className="productList__addButton">
          <PackagePlus />
          Add new product
        </button>
      </Link>
    </div>
  );
}

export default ProductList;
