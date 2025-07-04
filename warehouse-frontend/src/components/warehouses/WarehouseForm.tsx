import { SquarePlus } from "lucide-react";
import "./WarehouseForm.scss";

function WarehouseForm() {
  return (
    // Warehouse form
    <form className="warehouseForm" method="post">
      {/* Title */}
      <h2 className="warehouseForm__title">Add new warehouse</h2>
      {/* Name */}
      <label className="warehouseForm__nameLabel" htmlFor="name">
        Name
      </label>
      <input
        className="warehouseForm__nameField"
        type="text"
        name="name"
        required
      />
      {/* Address */}
      <label className="warehouseForm__locationLabel">Location</label>
      <div className="warehouseForm__location">
        {/* Country */}
        <div className="warehouseForm__location__country">
          <label
            className="warehouseForm__location__country__countryLabel"
            htmlFor="country"
          >
            Country
          </label>
          <input
            className="warehouseForm__location__country__countryField"
            type="text"
            name="country"
            required
          />
        </div>
        {/* City */}
        <div className="warehouseForm__location__city">
          <label
            className="warehouseForm__location__city__cityLabel"
            htmlFor="city"
          >
            City
          </label>
          <input
            className="warehouseForm__location__city__cityField"
            type="text"
            name="city"
            required
          />
        </div>
        {/* Address */}
        <div className="warehouseForm__location__address">
          <label
            className="warehouseForm__location__address__addressLabel"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="warehouseForm__location__address__addressField"
            type="text"
            name="address"
            required
          />
        </div>
      </div>
      {/* Add button */}
      <button className="warehouseForm__button" type="submit">
        <SquarePlus />
        Add
      </button>
    </form>
  );
}

export default WarehouseForm;
