import { Link } from "react-router-dom";
import "./ReportList.scss";

function ReportList() {
  const reports = [
    { id: "1", name: "Daily report" },
    { id: "2", name: "Weekly report" },
    { id: "3", name: "Monthly report" },
  ];
  
  return (
    <div className="report-list">
      {reports.map((report) => (
        <Link
          to={`/reports/${report.id}`}
          key={report.id}
          className="report-list__item"
        >
          {report.name}
        </Link>
      ))}
    </div>
  );
}

export default ReportList;
