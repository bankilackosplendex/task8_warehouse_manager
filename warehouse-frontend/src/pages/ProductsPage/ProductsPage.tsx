import "./ProductsPage.scss";
import ProductList from "../../components/products/ProductList.tsx";
import BackButton from "../../components/common/BackButton.tsx";
import ProductForm from "../../components/products/ProductForm.tsx";
import ProductDetails from "../../components/products/ProductDetails.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { PackagePlus } from "lucide-react";

function ProductsPage() {
  return (
    // Proudcts page
    <div className="productsPage">
      <BackButton />
      {/* Title */}
      <h2 className="productsPage__title">Products</h2>
      {/* Routes in /products */}
      <Routes>
        {/* Product list */}
        <Route path="/" element={<ProductList />} />
        {/* Product details */}
        <Route path="add" element={<ProductForm type={FormType.CREATE} />} />
        {/* Product create form */}
        <Route path=":productId" element={<ProductDetails />} />
        {/* Product upadte form */}
        <Route
          path="modify/:productId"
          element={<ProductForm type={FormType.MODIFY} />}
        />
      </Routes>
    </div>
  );
}

export default ProductsPage;
