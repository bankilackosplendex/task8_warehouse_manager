import { Link } from "react-router-dom";
import "./CompanyList.scss";
import { useEffect, useState } from "react";
import { Company } from "../../types/CompanyType.tsx";
import { getCompanies } from "../../services/companyService.tsx";
import {Briefcase} from "lucide-react"; 

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
    <div className="company-list">
      {companies.map((company) => (
        <Link
          to={`/companies/${company.id}`}
          key={company.id}
          className="company-list__item"
        >
          <Briefcase />
          {company.name}
        </Link>
      ))}
    </div>
  );
}

export default CompanyList;
