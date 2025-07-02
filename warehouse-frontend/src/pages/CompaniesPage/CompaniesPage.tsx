import { Link } from "react-router-dom";
import CompanyList from "../../components/companies/CompanyList.tsx";
import "./CompaniesPage.scss";

function CompaniesPage() {
  return (
    <div className="companiesPage">
      <h2 className="companiesPage__title">Companies</h2>
      <CompanyList />
      <Link to="/companies/add">
        <button className="companiesPage__addButton">Add new company</button>
      </Link>
    </div>
  );
}

export default CompaniesPage;
