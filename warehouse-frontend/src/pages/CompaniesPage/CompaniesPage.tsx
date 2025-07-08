import "./CompaniesPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import CompanyList from "../../components/companies/CompanyList.tsx";
import CompanyDetails from "../../components/companies/CompanyDetails.tsx";
import CompanyForm from "../../components/companies/CompanyForm.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { SquarePlus } from "lucide-react";

function CompaniesPage() {
  return (
    // Companies page
    <div className="companiesPage">
      <div className="companiesPage__header">
        <BackButton />
        {/* Title */}
        <h2 className="companiesPage__header__title">Companies</h2>
      </div>
      {/* Routes in /companies */}
      <Routes>
        {/* Company list */}
        <Route path="/" element={<CompanyList />} />
        {/* Company details */}
        <Route path="/:companyId" element={<CompanyDetails />} />
        {/* Company create form */}
        <Route path="/add" element={<CompanyForm type={FormType.CREATE} />} />
        {/* Company upadte form */}
        <Route
          path="/modify/:companyId"
          element={<CompanyForm type={FormType.MODIFY} />}
        />
      </Routes>
    </div>
  );
}

export default CompaniesPage;
