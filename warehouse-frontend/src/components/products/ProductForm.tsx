import { FileDigit, PackagePlus, Ruler, Save, Tag } from "lucide-react";
import "./ProductForm.scss";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useState } from "react";
import { Product } from "../../types/ProductType.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService.tsx";
import { QuantityType } from "../../enums/QuantityTypeEnum.tsx";

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
      } else {
        const data = {
          name: "",
          number: null,
          quantityType: QuantityType.DB,
        };
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
        <Tag className="productForm__nameLabel__icon" />
        Name
      </label>
      <input
        className="productForm__nameField"
        type="text"
        name="name"
        defaultValue={product.name ? product.name : ""}
        required
      />
      {/* Article number */}
      <label
        className="productForm__articleNumberLabel"
        htmlFor="articleNumber"
      >
        <FileDigit className="productForm__articleNumberLabel__icon" />
        Article number
      </label>
      <input
        className="productForm__articleNumberField"
        type="text"
        name="articleNumber"
        defaultValue={product.number ? product.number : ""}
        required
      />
      {/* Quantity type */}
      <label className="productForm__quantityTypeLabel" htmlFor="quantityType">
        <Ruler className="productForm__quantityTypeLabel__icon" />
        Quantity type
      </label>
      <select
        className="productForm__quantityTypeField"
        name="quantityType"
        defaultValue={product.quantityType ? product.quantityType : "DB"}
        required
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
