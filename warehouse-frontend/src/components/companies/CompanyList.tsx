import { Link, useNavigate } from "react-router-dom";
import "./CompanyList.scss";
import { useEffect, useState } from "react";
import { Company } from "../../types/CompanyType.tsx";
import { getCompanies } from "../../services/companyService.tsx";
import { Briefcase, SquarePlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

function CompanyList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load companies";
        setError(msg);
      }
    };

    fetchCompanies();
  }, []);

  function onAddButtonClick() {
    navigate("/companies/add");
  }

  return (
    <div className="companyList">
      {companies.map((company) => (
        <Link
          to={`/companies/${company.id}`}
          key={company.id}
          className="companyList__item"
        >
          <Briefcase />
          {company.name}
        </Link>
      ))}
      {user?.role === Role.ADMIN && (
        <button
          className="companyList__addButton"
          onClick={() => onAddButtonClick()}
        >
          <SquarePlus />
          Add new company
        </button>
      )}
    </div>
  );
}

export default CompanyList;
