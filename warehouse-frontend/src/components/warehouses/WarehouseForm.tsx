import { Save, SquarePlus } from "lucide-react";
import "./WarehouseForm.scss";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getWarehouseById } from "../../services/warehouseService.tsx";
import { useState } from "react";
import { Warehouse } from "../../types/WarehouseType.tsx";

function WarehouseForm({ type }: { type: FormType }) {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState<Warehouse>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWarehouse = async () => {
      if (warehouseId) {
        try {
          const data = await getWarehouseById(+warehouseId);
          if (!data.products) data.products = "-";
          if (!data.movements) data.movements = "-";
          setWarehouse(data);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load warehouse";
          setError(msg);
        }
      } else {
        const data = {
          name: "",
          address: "",
        };
        setWarehouse(data);
      }
    };

    fetchWarehouse();
  }, []);

  function getAddressFields(address: string): string[] {
    if (!address) return ["","",""];
    const [rawMainPart, countryRaw] = address.split(",");
    const country = countryRaw?.trim() || "";

    const words = rawMainPart.trim().split(" ");
    const city = words[0];
    const streetAddress = words.slice(1).join(" ");

    return [country, city, streetAddress];
  }

  return (
    // Warehouse form
    <form className="warehouseForm" method="post">
      {/* Title */}
      {type == FormType.CREATE && (
        <>
          <h2 className="warehouseForm__title">Add new warehouse</h2>
        </>
      )}
      {type == FormType.MODIFY && (
        <>
          <h2 className="warehouseForm__title">Update warehouse</h2>
        </>
      )}
      {/* Name */}
      <label className="warehouseForm__nameLabel" htmlFor="name">
        Name
      </label>
      <input
        className="warehouseForm__nameField"
        type="text"
        name="name"
        value={warehouse.name}
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
            value={getAddressFields(warehouse.address)[0]}
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
            value={getAddressFields(warehouse.address)[1]}
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
            value={getAddressFields(warehouse.address)[2]}
            required
          />
        </div>
      </div>
      {/* Add button */}
      <button className="warehouseForm__button" type="submit">
        {type == FormType.CREATE && (
          <>
            <SquarePlus />
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

export default WarehouseForm;
