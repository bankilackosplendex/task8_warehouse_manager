import "./ReportsPage.scss";
import ReportList from "../../components/reports/ReportList.tsx";
import BackButton from "../../components/common/BackButton.tsx";
import { Routes, Route } from "react-router-dom";
import ReportDetails from "../../components/reports/ReportDetails.tsx";
import { FileText, LayoutList } from "lucide-react";
import ErrorWindow from "../../components/common/ErrorWindow.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

function ReportsPage() {
  // --- USER INFO ---
  const { user } = useAuth();

  if (!user) return <ErrorWindow text="Access Denied" statusCode={401} />;

  return (
    // Reports page
    <div className="reportsPage">
      {/* Routes in /reports */}
      <Routes>
        {/* Report list */}
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        {/* Report details */}
        <Route
          path="/:reportId"
          element={
            <>
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
            </>
          }
        />
        {/* NOT FOUND PAGE */}
        <Route
          path="/*"
          element={<ErrorWindow text={"404 Not found"} statusCode={404} />}
        />
      </Routes>
    </div>
  );
}

export default ReportsPage;
