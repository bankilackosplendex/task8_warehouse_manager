import { Link } from "react-router-dom";
import ProductList from "../../components/products/ProductList.tsx";
import "./ProductsPage.scss";

function ProductsPage() {
  return (
    <div className="productsPage">
      <h2 className="productsPage__title">Products</h2>
      <ProductList />
      <Link to="/products/add">
        <button className="productsPage__addButton">Add new product</button>
      </Link>
    </div>
  );
}

export default ProductsPage;
