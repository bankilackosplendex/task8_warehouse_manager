import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails.tsx";

function ProductList() {
  return (
    <div>
      Product List
      <Link to="/products/product1">
        <ProductDetails />
      </Link>
      <Link to="/products/product2">
        <ProductDetails />
      </Link>
      <Link to="/products/product3">
        <ProductDetails />
      </Link>
    </div>
  );
}

export default ProductList;
