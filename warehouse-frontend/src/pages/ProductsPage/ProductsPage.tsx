import "./ProductsPage.scss";
import ProductList from "../../components/products/ProductList.tsx";
import BackButton from "../../components/common/BackButton.tsx";
import ProductForm from "../../components/products/ProductForm.tsx";
import ProductDetails from "../../components/products/ProductDetails.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import {
  ClipboardList,
  LayoutList,
  PackagePlus,
  Pencil,
  SquarePlus,
} from "lucide-react";
import ErrorWindow from "../../components/common/ErrorWindow.tsx";

function ProductsPage() {
  return (
    // Proudcts page
    <div className="productsPage">
      {/* Routes in /products */}
      <Routes>
        {/* Product list */}
        <Route
          path="/"
          element={
            <>
              {/* Page header */}
              <div className="productsPage__listHeader">
                <BackButton />
                {/* Title */}
                <h2 className="productsPage__listHeader__title">
                  <LayoutList />
                  Products
                </h2>
              </div>
              {/* List component */}
              <ProductList />
            </>
          }
        />
        {/* Product details */}
        <Route
          path=":productId"
          element={
            <>
              {/* Page header */}
              <div className="productsPage__detailsHeader">
                <BackButton />
                {/* Title */}
                <h2 className="productsPage__detailsHeader__title">
                  <ClipboardList />
                  Product details
                </h2>
              </div>
              {/* Deatils component */}
              <ProductDetails />
            </>
          }
        />
        {/* Product create form */}
        <Route
          path="add"
          element={
            <>
              {/* Page header */}
              <div className="productsPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="productsPage__formHeader__title">
                  <SquarePlus />
                  Add new product
                </h2>
              </div>
              {/* Form component */}
              <ProductForm type={FormType.CREATE} />
            </>
          }
        />
        {/* Product upadte form */}
        <Route
          path="modify/:productId"
          element={
            <>
              {/* Page header */}
              <div className="productsPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="productsPage__formHeader__title">
                  <Pencil />
                  Modify product
                </h2>
              </div>
              {/* Form component */}
              <ProductForm type={FormType.MODIFY} />
            </>
          }
        />
        {/* NOT FOUND PAGE */}
        <Route
          path="/*"
          element={<ErrorWindow text={"404 Not found"} statusCode={404} />}
        />
      </Routes>
    </div>
  );
}

export default ProductsPage;
