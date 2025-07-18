import "./CompaniesPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import CompanyList from "../../components/companies/CompanyList.tsx";
import CompanyDetails from "../../components/companies/CompanyDetails.tsx";
import CompanyForm from "../../components/companies/CompanyForm.tsx";
import { Route, Routes } from "react-router-dom";
import { FormType } from "../../enums/FormTypeEnum.tsx";
import { ClipboardList, LayoutList, Pencil, SquarePlus } from "lucide-react";
import ErrorWindow from "../../components/common/ErrorWindow.tsx";
import ProtectedRoute from "../../components/authorization/ProtectedRoute.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

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
            <ProtectedRoute allowedRoles={[Role.USER, Role.ADMIN]}>
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
            </ProtectedRoute>
          }
        />
        {/* Company details */}
        <Route
          path="/:companyId"
          element={
            <ProtectedRoute allowedRoles={[Role.USER, Role.ADMIN]}>
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
            </ProtectedRoute>
          }
        />
        {/* Company create form */}
        <Route
          path="/add"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
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
            </ProtectedRoute>
          }
        />
        {/* Company upadte form */}
        <Route
          path="/modify/:companyId"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
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
            </ProtectedRoute>
          }
        />
        {/* Not found page */}
        <Route
          path="/*"
          element={
            <ErrorWindow
              text={"404 Not found"}
              statusCode={404}
              onClose={function () {}}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default CompaniesPage;
