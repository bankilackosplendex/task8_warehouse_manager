import "./CompanyList.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Company } from "../../types/CompanyType.tsx";
import { getCompanies } from "../../services/companyService.tsx";
import { Briefcase, SquarePlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";
import ErrorWindow from "../common/ErrorWindow.tsx";

function CompanyList() {
  // --- USER INFO ---
  const { user } = useAuth();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- COMPANIY ENTITIES ---
  const [companies, setCompanies] = useState<Company[]>([]);

  // --- ERROR --
  const [error, setError] = useState("");
  const [statusCode, setSatusCode] = useState<number>();

  // --- FETCH THE COMPANIES DATA FROM BACKEND ---
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load companies";
        setError(msg);
        setSatusCode(503);
      }
    };

    fetchCompanies();
  }, []);

  // --- ADD COMPANY FUNCTION ---
  function onAddButtonClick() {
    navigate("/companies/add");
  }

  if (error)
    return (
      // Error window
      <ErrorWindow text={error} statusCode={statusCode} onClose={() => setError("")} />
    );

  return (
    // Company List
    <div className="companyList">
      {/* Company records */}
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
        // Add button
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
