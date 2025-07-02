import ProductList from "../../components/products/ProductList.tsx";
import "./ProductsPage.scss";

function ProductsPage() {
  return (
    <div className="productsPage">
      <h2 className="productsPage__title">Products</h2>
      <ProductList />
    </div>
  );
}

export default ProductsPage;
