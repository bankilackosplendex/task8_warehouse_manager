import { Link } from "react-router-dom";
import "./ReportList.scss";
import { Download } from "lucide-react";

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
          className="report-list__item"
          key={report.id}
        >
          <div className="report-list__item__name">{report.name}</div>
          <button
            className="report-list__item__downloadButton"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Download />
          </button>
        </Link>
      ))}
    </div>
  );
}

export default ReportList;
