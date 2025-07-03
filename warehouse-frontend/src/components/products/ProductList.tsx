import { Link } from "react-router-dom";
import "./ProductList.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.tsx";

type Product = {
  id: string;
  name: string;
};

function ProductList() {
  const productsMock = [
    { id: "1", name: "Csavar M8" },
    { id: "2", name: "Szög 20mm" },
    { id: "3", name: "Alátét 10mm" },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        const msg =
          err.response?.data?.message || "Nem sikerült betölteni a termékeket.";
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
