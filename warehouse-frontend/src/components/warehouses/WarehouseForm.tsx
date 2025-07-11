import "./WarehouseForm.scss";
import {
  Building2,
  Earth,
  MapPin,
  Save,
  SquarePlus,
  Tag,
  MapPinHouse,
  TextIcon,
} from "lucide-react";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  createWarehouse,
  getWarehouseById,
  updateWarehouse,
} from "../../services/warehouseService.tsx";
import { useState } from "react";
import { Warehouse } from "../../types/WarehouseType.tsx";

function WarehouseForm({ type }: { type: FormType }) {
  // --- WAREHOUSE ID URL PARAMETER ---
  const { warehouseId } = useParams();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- WAREHOUSE ENTITY ---
  const [warehouse, setWarehouse] = useState<Warehouse>([]);

  // --- ERROR ---
  const [error, setError] = useState("");

  // --- FETCH THE WAREHOUSE'S DATA FROM BACKEND ---
  useEffect(() => {
    const fetchWarehouse = async () => {
      if (warehouseId) {
        try {
          const data = await getWarehouseById(+warehouseId);
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

  // --- EXTRAXT COUNTRY, CITY AND STREET ADDRESS VALUES FUNCTION ---
  function getAddressFields(address: string): string[] {
    if (!address) return ["", "", ""];
    const [rawMainPart, countryRaw] = address.split(",");
    const country = countryRaw?.trim() || "";

    const words = rawMainPart.trim().split(" ");
    const city = words[0];
    const streetAddress = words.slice(1).join(" ");

    return [country, city, streetAddress];
  }

  // --- CREATE/MODIFY WAREHOUSE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (type == FormType.CREATE) {
        await createWarehouse(warehouse);
      } else if (type == FormType.MODIFY && warehouseId) {
        const cleanWarehouse = { ...warehouse };
        delete cleanWarehouse.movements;
        await updateWarehouse(+warehouseId, cleanWarehouse);
      }

      navigate("/warehouses");
    } catch (err: any) {
      console.error("Warehouse operation failed", err);
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

  // --- SET NAME WITH THE INPUT VALUE FUNCTION ---
  function setName(name: string): void {
    setWarehouse((prev) => ({ ...prev, name }));
  }

  // --- SET DESCRIPTION WITH THE INPUT VALUE FUNCTION ---
  function setDescription(d: string): void {
    setWarehouse((prev) => ({ ...prev, description: d }));
  }

  // --- SET COUNTRY WITH THE INPUT VALUE FUNCTION ---
  function setCountry(country: string): void {
    const [_, city, street] = getAddressFields(warehouse.address || "");
    const newAddress = `${city} ${street}, ${country}`;
    setWarehouse((prev) => ({ ...prev, address: newAddress }));
  }

  // --- SET CITY WITH THE INPUT VALUE FUNCTION ---
  function setCity(city: string): void {
    const [country, _, street] = getAddressFields(warehouse.address || "");
    const newAddress = `${city} ${street}, ${country}`;
    setWarehouse((prev) => ({ ...prev, address: newAddress }));
  }

  // --- SET STREET ADDRESS WITH THE INPUT VALUE FUNCTION ---
  function setStreetAddress(street: string): void {
    const [country, city, _] = getAddressFields(warehouse.address || "");
    const newAddress = `${city} ${street}, ${country}`;
    setWarehouse((prev) => ({ ...prev, address: newAddress }));
  }

  return (
    // Warehouse form
    <form className="warehouseForm" onSubmit={handleSubmit}>
      {/* Name */}
      <label className="warehouseForm__nameLabel" htmlFor="name">
        <Tag className="warehouseForm__nameLabel__icon" />
        Name
      </label>
      <input
        className="warehouseForm__nameField"
        type="text"
        name="name"
        defaultValue={warehouse.name ? warehouse.name : ""}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {/* Description */}
      <label className="warehouseForm__descriptionLabel" htmlFor="description">
        <TextIcon className="warehouseForm__descriptionLabel__icon" />
        Description
      </label>
      <textarea
        className="warehouseForm__descriptionField"
        name="description"
        defaultValue={warehouse.description ? warehouse.description : ""}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {/* Address */}
      <label className="warehouseForm__locationLabel">
        <MapPin className="warehouseForm__locationLabel__icon" />
        Location
      </label>
      <div className="warehouseForm__location">
        {/* Country */}
        <div className="warehouseForm__location__country">
          <label
            className="warehouseForm__location__country__countryLabel"
            htmlFor="country"
          >
            <Earth className="warehouseForm__location__country__countryLabel__icon" />
            Country
          </label>
          <input
            className="warehouseForm__location__country__countryField"
            type="text"
            name="country"
            defaultValue={
              warehouse.address ? getAddressFields(warehouse.address)[0] : ""
            }
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        {/* City */}
        <div className="warehouseForm__location__city">
          <label
            className="warehouseForm__location__city__cityLabel"
            htmlFor="city"
          >
            <Building2 className="warehouseForm__location__city__cityLabel__icon" />
            City
          </label>
          <input
            className="warehouseForm__location__city__cityField"
            type="text"
            name="city"
            defaultValue={
              warehouse.address ? getAddressFields(warehouse.address)[1] : ""
            }
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        {/* Address */}
        <div className="warehouseForm__location__address">
          <label
            className="warehouseForm__location__address__addressLabel"
            htmlFor="address"
          >
            <MapPinHouse className="warehouseForm__location__address__addressLabel__icon" />
            Address
          </label>
          <input
            className="warehouseForm__location__address__addressField"
            type="text"
            name="address"
            defaultValue={
              warehouse.address ? getAddressFields(warehouse.address)[2] : ""
            }
            onChange={(e) => setStreetAddress(e.target.value)}
            required
          />
        </div>
      </div>
      <button className="warehouseForm__button" type="submit">
        {/* Add button */}
        {type == FormType.CREATE && (
          <>
            <SquarePlus />
            Add
          </>
        )}
        {/* Save button */}
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
