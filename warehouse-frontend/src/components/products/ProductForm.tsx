import "./ProductForm.scss";

function ProductForm() {
  return (
    // Product form
    <form className="productForm" method="post">
      {/* Title */}
      <h2 className="productForm__title">Add new product</h2>
      {/* Name */}
      <label className="productForm__nameLabel" htmlFor="name">Name</label>
      <input
        className="productForm__nameField"
        type="text"
        name="name"
        required
      />
      {/* Article number */}
      <label className="productForm__articleNumberLabel" htmlFor="articleNumber">Article number</label>
      <input
        className="productForm__articleNumberField"
        type="text"
        name="articleNumber"
        required
      />
      {/* Quantity type */}
      <label className="productForm__quantityTypeLabel" htmlFor="quantityType">Quantity type</label>
      <select
        className="productForm__quantityTypeField"
        type="text"
        name="quantityType"
        required
      >
        <option value="DB">DB</option>
        <option value="KG">KG</option>
      </select>
      {/* Add button */}
      <button className="productForm__button" type="submit">Add</button>
    </form>
  );
}

export default ProductForm;