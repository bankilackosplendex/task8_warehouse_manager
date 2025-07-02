import { Link } from "react-router-dom";
import "./ProductList.scss";

function ProductList() {
  const products = [
    { id: "1", name: "Csavar M8" },
    { id: "2", name: "Szög 20mm" },
    { id: "3", name: "Alátét 10mm" },
  ];
  
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
