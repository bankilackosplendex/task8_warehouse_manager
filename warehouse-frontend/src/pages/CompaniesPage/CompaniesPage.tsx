import CompanyList from "../../components/companies/CompanyList.tsx";
import "./CompaniesPage.scss";

function CompaniesPage() {
  return (
    <div className="companiesPage">
      <h2 className="companiesPage__title">Companies</h2>
      <CompanyList />
    </div>
  );
}

export default CompaniesPage;
