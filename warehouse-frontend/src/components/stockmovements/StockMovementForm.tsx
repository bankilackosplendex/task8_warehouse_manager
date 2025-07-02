import "./StockMovementForm.scss";

function StockMovementsForm() {
  const companies = [
    { id: "1", name: "IKEA" },
    { id: "2", name: "Praktiker" },
    { id: "3", name: "OBI" },
  ];

  const products = [
    { id: "1", name: "Csavar M8" },
    { id: "2", name: "Szög 20mm" },
    { id: "3", name: "Alátét 10mm" },
  ];

  const warehouses = [
    { id: "1", name: "Budapest warehouse" },
    { id: "2", name: "Pécs warehouse" },
    { id: "3", name: "Szeged warehouse" },
  ];

  return (
    // StockMovements form
    <form className="stockMovementsForm" method="post">
      {/* Title */}
      <h2 className="stockMovementsForm__title">Add new stockmovement</h2>
      {/* Date */}
      <label className="stockMovementsForm__dateLabel" htmlFor="date">
        Date
      </label>
      <input
        className="stockMovementsForm__dateField"
        type="datetime-local"
        name="date"
        required
      />
      {/* Product */}
      <label className="stockMovementsForm__productLabel" htmlFor="product">
        Product
      </label>
      <select
        className="stockMovementsForm__productField"
        type="text"
        name="product"
        required
      >
        <option value=""></option>
        {products.map((product) => (
          <option value={product.id}>{product.name}</option>
        ))}
      </select>
      {/* Warehouse */}
      <label className="stockMovementsForm__warehouseLabel" htmlFor="warehouse">
        Warehouse
      </label>
      <select
        className="stockMovementsForm__warehouseField"
        type="text"
        name="warehouse"
        required
      >
        <option value=""></option>
        {warehouses.map((warehouse) => (
          <option value={warehouse.id}>{warehouse.name}</option>
        ))}
      </select>
      {/* Movement type */}
      <label
        className="stockMovementsForm__movementTypeLabel"
        htmlFor="movementType"
      >
        Movement type
      </label>
      <select
        className="stockMovementsForm__movementTypeField"
        type="text"
        name="movementType"
        required
      >
        <option value="DB">IMPORT</option>
        <option value="KG">EXPORT</option>
      </select>
      {/* Company */}
      <label className="stockMovementsForm__companyLabel" htmlFor="company">
        Company
      </label>
      <select
        className="stockMovementsForm__companyField"
        type="text"
        name="company"
        required
      >
        <option value=""></option>
        {companies.map((company) => (
          <option value={company.id}>{company.name}</option>
        ))}
      </select>
      {/* Add button */}
      <button className="stockMovementsForm__button" type="submit">
        Add
      </button>
    </form>
  );
}

export default StockMovementsForm;
