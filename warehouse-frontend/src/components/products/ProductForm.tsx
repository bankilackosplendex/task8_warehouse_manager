import { PackagePlus, Save } from "lucide-react";
import "./ProductForm.scss";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useState } from "react";
import { Product } from "../../types/ProductType.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService.tsx";

function ProductForm({ type }: { type: FormType }) {
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
      else {
        const data = {

        }
      }
    };

    fetchProduct();
  }, []);

  return (
    // Product form
    <form className="productForm" method="post">
      {/* Title */}
      {type == FormType.CREATE && (
        <>
          <h2 className="productForm__title">Add new product</h2>
        </>
      )}
      {type == FormType.MODIFY && (
        <>
          <h2 className="productForm__title">Update product</h2>
        </>
      )}

      {/* Name */}
      <label className="productForm__nameLabel" htmlFor="name">
        Name
      </label>
      <input
        className="productForm__nameField"
        type="text"
        name="name"
        value={product.name}
        required
      />
      {/* Article number */}
      <label
        className="productForm__articleNumberLabel"
        htmlFor="articleNumber"
      >
        Article number
      </label>
      <input
        className="productForm__articleNumberField"
        type="text"
        name="articleNumber"
        value={product.number}
        required
      />
      {/* Quantity type */}
      <label className="productForm__quantityTypeLabel" htmlFor="quantityType">
        Quantity type
      </label>
      <select
        className="productForm__quantityTypeField"
        name="quantityType"
        required
        value={product.quantityType}
      >
        <option value="DB">DB</option>
        <option value="KG">KG</option>
      </select>
      {/* Add button */}
      <button className="productForm__button" type="submit">
        {type == FormType.CREATE && (
          <>
            <PackagePlus />
            Add
          </>
        )}
        {type == FormType.MODIFY && (
          <>
            <Save />
            Save
          </>
        )}
      </button>
    </form>
  );
}

export default ProductForm;
