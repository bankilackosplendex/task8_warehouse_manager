import "./CompaniesPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import CompanyList from "../../components/companies/CompanyList.tsx";
import CompanyDetails from "../../components/companies/CompanyDetails.tsx";
import CompanyForm from "../../components/companies/CompanyForm.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { ClipboardList, LayoutList, Pencil, SquarePlus } from "lucide-react";

function CompaniesPage() {
  return (
    // Companies page
    <div className="companiesPage">
      {/* Routes in /companies */}
      <Routes>
        {/* Company list */}
        <Route
          path="/"
          element={
            <>
              {/* Page header */}
              <div className="companiesPage__listHeader">
                <BackButton />
                {/* Title */}
                <h2 className="companiesPage__listHeader__title">
                  <LayoutList />
                  Companies
                </h2>
              </div>
              {/* List component */}
              <CompanyList />
            </>
          }
        />
        {/* Company details */}
        <Route
          path="/:companyId"
          element={
            <>
              {/* Page header */}
              <div className="companiesPage__detailsHeader">
                <BackButton />
                {/* Title */}
                <h2 className="companiesPage__detailsHeader__title">
                  <ClipboardList />
                  Company details
                </h2>
              </div>
              {/* Details component */}
              <CompanyDetails />
            </>
          }
        />
        {/* Company create form */}
        <Route
          path="/add"
          element={
            <>
              {/* Page header */}
              <div className="companiesPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="companiesPage__formHeader__title">
                  <SquarePlus />
                  Add new company
                </h2>
              </div>
              {/* Form component */}
              <CompanyForm type={FormType.CREATE} />
            </>
          }
        />
        {/* Company upadte form */}
        <Route
          path="/modify/:companyId"
          element={
            <>
              {/* Page header */}
              <div className="companiesPage__formHeader">
                <BackButton />
                {/* Title */}
                <h2 className="companiesPage__formHeader__title">
                  <Pencil />
                  Modify company
                </h2>
              </div>
              {/* Form component */}
              <CompanyForm type={FormType.MODIFY} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default CompaniesPage;
