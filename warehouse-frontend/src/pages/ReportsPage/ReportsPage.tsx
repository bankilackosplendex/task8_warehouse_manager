import "./ReportsPage.scss";
import ReportList from "../../components/reports/ReportList.tsx";
import BackButton from "../../components/common/BackButton.tsx";
import { Routes, Route } from "react-router-dom";
import ReportDetails from "../../components/reports/ReportDetails.tsx";
import { FileText, LayoutList } from "lucide-react";
import ErrorWindow from "../../components/common/ErrorWindow.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";
import ProtectedRoute from "../../components/authorization/ProtectedRoute.tsx";

function ReportsPage() {
  return (
    // Reports page
    <div className="reportsPage">
      {/* Routes in /reports */}
      <Routes>
        {/* Report list */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={[Role.USER, Role.ADMIN]}>
              {/* Page header */}
              <div className="reportsPage__header">
                <BackButton />
                {/* Title */}
                <h2 className="reportsPage__header__title">
                  <LayoutList />
                  Reports
                </h2>
              </div>
              {/* List component */}
              <ReportList />
            </ProtectedRoute>
          }
        />
        {/* Report details */}
        <Route
          path="/:reportId"
          element={
            <ProtectedRoute allowedRoles={[Role.USER, Role.ADMIN]}>
              {/* Page header */}
              <div className="reportsPage__header">
                <BackButton />
                {/* Title */}
                <h2 className="reportsPage__header__title">
                  <FileText />
                  Report PDF preview
                </h2>
              </div>
              {/* Details component */}
              <ReportDetails />
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

export default ReportsPage;
