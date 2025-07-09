import { Link } from "react-router-dom";
import "./ReportList.scss";
import { Download, FileText } from "lucide-react";

function ReportList() {
  const reports = [
    { id: "1", name: "Daily report" },
    { id: "2", name: "Weekly report" },
    { id: "3", name: "Monthly report" },
  ];

  return (
    <div className="reportList">
      {reports.map((report) => (
        <Link
          to={`/reports/${report.id}`}
          className="reportList__item"
          key={report.id}
        >
          <div className="reportList__item__name">
            <FileText />
            {report.name}</div>
          <button
            className="reportList__item__downloadButton"
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
