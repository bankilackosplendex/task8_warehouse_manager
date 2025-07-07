import "./ReportsPage.scss";
import ReportList from "../../components/reports/ReportList.tsx";
import BackButton from "../../components/common/BackButton.tsx";

function ReportsPage() {
  return (
    <div className="reportsPage">
      <BackButton />
      <h2 className="reportsPage__title">Reports</h2>
      <ReportList />
    </div>
  );
}

export default ReportsPage;
