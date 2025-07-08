import { Link } from "react-router-dom";
import "./CompanyList.scss";
import { useEffect, useState } from "react";
import { Company } from "../../types/CompanyType.tsx";
import { getCompanies } from "../../services/companyService.tsx";
import { Briefcase, SquarePlus } from "lucide-react";

function CompanyList() {
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
      <Link to="/companies/add">
        <button className="companyList__addButton">
          <SquarePlus />
          Add new company
        </button>
      </Link>
    </div>
  );
}

export default CompanyList;
