import { Link } from "react-router-dom";
import "./ReportList.scss";

function ReportList() {
  const reports = [
    { id: "1", name: "Daily report" },
    { id: "2", name: "Weekly report" },
    { id: "3", name: "Monthly report" },
  ];

  return (
    // <div className="report-list">
    //   {reports.map((report) => (
    //     <Link
    //       to={`/reports/${report.id}`}
    //       key={report.id}
    //       className="report-list__item"
    //     >
    //       {report.name}
    //       <button className="report-list__downloadButton">Download</button>
    //     </Link>
    //   ))}
    // </div>
    <div className="report-list">
      {reports.map((report) => (
        <div className="report-list__item" key={report.id}>
          <Link to={`/reports/${report.id}`} className="report-list__item__link">
            {report.name}
          </Link>
          <button
            className="report-list__item__downloadButton"
            onClick={(e) => {
              e.stopPropagation(); // ne zavarja a linket
              // letöltési logika
            }}
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}

export default ReportList;
