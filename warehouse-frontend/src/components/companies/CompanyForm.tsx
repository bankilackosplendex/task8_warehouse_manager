import "./CompanyForm.scss";
import { Save, SquarePlus, Tag } from "lucide-react";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Company } from "../../types/CompanyType.tsx";
import { useEffect } from "react";
import {
  createCompany,
  getCompanyById,
  updateCompany,
} from "../../services/companyService.tsx";

function CompanyForm({ type }: { type: FormType }) {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      if (companyId) {
        try {
          const data = await getCompanyById(+companyId);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (type == FormType.CREATE) {
        await createCompany(company);
      } else if (type == FormType.MODIFY && companyId) {
        const cleanCompany = { ...company };
        delete cleanCompany.movements;
        await updateCompany(+companyId, cleanCompany);
      }

      navigate("/companies");
    } catch (err: any) {
      console.error("Company operation failed", err);
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
    setCompany((prev) => ({ ...prev, name: name }));
  }

  return (
    // Company form
    <form className="companyForm" onSubmit={handleSubmit}>
      {/* Name */}
      <label className="companyForm__nameLabel" htmlFor="name">
        <Tag className="companyForm__nameLabel__icon" />
        Name
      </label>
      <input
        className="companyForm__nameField"
        type="text"
        name="name"
        defaultValue={company.name ? company.name : ""}
        onChange={(e) => setName(e.target.value)}
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
