import { Link } from "react-router-dom";
import "./CompanyList.scss";

function CompanyList() {
  const companies = [
    { id: "1", name: "IKEA" },
    { id: "2", name: "Praktiker" },
    { id: "3", name: "OBI" },
  ];

  return (
    <div className="company-list">
      {companies.map((company) => (
        <Link
          to={`/companies/${company.name}`}
          key={company.id}
          className="company-list__item"
        >
          {company.name}
        </Link>
      ))}
    </div>
  );
}

export default CompanyList;
