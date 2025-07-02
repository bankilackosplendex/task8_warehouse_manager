import "./ReportsPage.scss";
import ReportList from "../../components/reports/ReportList.tsx";

function ReportsPage() {
  return (
    <div className="reportsPage">
      <h2 className="reportsPage__title">Reports</h2>
      <ReportList />
    </div>
  );
}

export default ReportsPage;
