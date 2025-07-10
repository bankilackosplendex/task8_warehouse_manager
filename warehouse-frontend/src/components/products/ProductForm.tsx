import { FileDigit, PackagePlus, Ruler, Save, Tag } from "lucide-react";
import "./ProductForm.scss";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useState } from "react";
import { Product } from "../../types/ProductType.tsx";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../services/productService.tsx";
import { QuantityType } from "../../enums/QuantityTypeEnum.tsx";

function ProductForm({ type }: { type: FormType }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: "",
    number: 0,
    quantityType: QuantityType.DB,
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (type == FormType.CREATE) {
        await createProduct(product);
      } else if (type == FormType.MODIFY && productId) {
        await updateProduct(+productId, product);
      }

      navigate("/products");
    } catch (err: any) {
      console.error("Product operation failed", err);
      if (err.response && err.response.data && err.response.data.message) {
        const msg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message;
        setError(msg);
      } else {
        setError("Unknown error");
      }
    }
  };

  function setName(name: string): void {
    setProduct((prev) => ({ ...prev, name }));
  }

  function setNumber(number: number): void {
    setProduct((prev) => ({ ...prev, number }));
  }

  function setQuantityType(qT: string): void {
    const qt = qT === "KG" ? QuantityType.KG : QuantityType.DB;
    setProduct((prev) => ({ ...prev, quantityType: qt }));
  }

  return (
    // Product form
    <form className="productForm" onSubmit={handleSubmit}>
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
        onChange={(e) => setName(e.target.value)}
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
        onChange={(e) => setNumber(+e.target.value)}
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
        onChange={(e) => setQuantityType(e.target.value)}
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
