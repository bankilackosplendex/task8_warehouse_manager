import { Building2, Earth, MapPin, Save, SquarePlus, Tag, MapPinHouse } from "lucide-react";
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
      {/* Name */}
      <label className="warehouseForm__nameLabel" htmlFor="name">
        <Tag className="warehouseForm__nameLabel__icon"/>
        Name
      </label>
      <input
        className="warehouseForm__nameField"
        type="text"
        name="name"
        defaultValue={warehouse.name ? warehouse.name : ""}
        required
      />
      {/* Address */}
      <label className="warehouseForm__locationLabel">
        <MapPin className="warehouseForm__locationLabel__icon"/>
        Location</label>
      <div className="warehouseForm__location">
        {/* Country */}
        <div className="warehouseForm__location__country">
          <label
            className="warehouseForm__location__country__countryLabel"
            htmlFor="country"
          >
            <Earth className="warehouseForm__location__country__countryLabel__icon"/>
            Country
          </label>
          <input
            className="warehouseForm__location__country__countryField"
            type="text"
            name="country"
            defaultValue={warehouse.address ? getAddressFields(warehouse.address)[0] : ""}
            required
          />
        </div>
        {/* City */}
        <div className="warehouseForm__location__city">
          <label
            className="warehouseForm__location__city__cityLabel"
            htmlFor="city"
          >
            <Building2 className="warehouseForm__location__city__cityLabel__icon"/>
            City
          </label>
          <input
            className="warehouseForm__location__city__cityField"
            type="text"
            name="city"
            defaultValue={warehouse.address ? getAddressFields(warehouse.address)[1] : ""}
            required
          />
        </div>
        {/* Address */}
        <div className="warehouseForm__location__address">
          <label
            className="warehouseForm__location__address__addressLabel"
            htmlFor="address"
          >
            <MapPinHouse className="warehouseForm__location__address__addressLabel__icon"/>
            Address
          </label>
          <input
            className="warehouseForm__location__address__addressField"
            type="text"
            name="address"
            defaultValue={warehouse.address ? getAddressFields(warehouse.address)[2] : ""}
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
