import "./ReportsPage.scss";
import ReportList from "../../components/reports/ReportList.tsx";
import BackButton from "../../components/common/BackButton.tsx";
import { Routes, Route } from "react-router-dom";
import ReportDetails from "../../components/reports/ReportDetails.tsx";

function ReportsPage() {
  return (
    // Reports page
    <div className="reportsPage">
      <BackButton />
      {/* Title */}
      <h2 className="reportsPage__title">Reports</h2>
      {/* Routes in /reports */}
      <Routes>
        {/* Report list */}
        <Route path="/" element={<ReportList />} />
        {/* Report details */}
        <Route path="/:reportId" element={<ReportDetails />} />
      </Routes>
    </div>
  );
}

export default ReportsPage;
