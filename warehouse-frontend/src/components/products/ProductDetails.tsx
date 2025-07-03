import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../types/ProductType";
import { getProductById } from "../../services/productService.tsx";

function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const data = await getProductById(+productId);
          setProduct(data);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load product";
          setError(msg);
        }
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="productDetails">
      <h2 className="productDetails__name">{product.name}</h2>
      <div className="productDetails__number">
        <p className="productDetails__number__key">Article number: </p>
        <p className="productDetails__number__value">{product.number}</p>
      </div>
      <div className="productDetails__quantityType">
        <p className="productDetails__quantityType__key">Quantity type: </p>
        <p className="productDetails__quantityType__value">
          {product.quantityType}
        </p>
      </div>
      <div className="productDetails__time">
        <p className="productDetails__time__key">Created at: </p>
        <p className="productDetails__time__value">
          {new Date(product.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
