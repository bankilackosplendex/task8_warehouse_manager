import { Save, SquarePlus } from "lucide-react";
import "./CompanyForm.scss";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../../types/CompanyType.tsx";
import { useEffect } from "react";
import { getCompanyById } from "../../services/companyService.tsx";

function CompanyForm({ type }: { type: FormType }) {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      if (companyId) {
        try {
          const data = await getCompanyById(+companyId);
          data.movements = [
            {
              id: 1,
              movementType: "IMPORT",
              createdAt: new Date(),
            },
            {
              id: 2,
              movementType: "EXPORT",
              createdAt: new Date(),
            },
          ];
          setCompany(data);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load company";
          setError(msg);
        }
      } else {
        const data = {
          name: "",
        };
        setCompany(data);
      }
    };

    fetchCompany();
  }, []);

  return (
    // Company form
    <form className="companyForm" method="post">
      {/* Title */}
      {type == FormType.CREATE && (
        <>
          <h2 className="warehouseForm__title">Add new company</h2>
        </>
      )}
      {type == FormType.MODIFY && (
        <>
          <h2 className="warehouseForm__title">Update company</h2>
        </>
      )}
      {/* Name */}
      <label className="companyForm__nameLabel" htmlFor="name">
        Name
      </label>
      <input
        className="companyForm__nameField"
        type="text"
        name="name"
        value={company.name}
        required
      />
      {/* Add button */}
      <button className="companyForm__button" type="submit">
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

export default CompanyForm;
