import "./ReportDetails.scss";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReportById } from "../../services/reportService.tsx";
import { Report } from "../../types/ReportType.tsx";

function ReportDetails() {
  const { reportId } = useParams();

  const [report, setReport] = useState<Report>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      if (reportId) {
        try {
          //const data = await getReportById(+reportId);
          const data = {
            name: "Daily report"
          }
          setReport(data);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load company";
          setError(msg);
        }
      }
    };

    fetchCompany();
  }, []);

  return (
    <div className="reportDetails">
      <h2 className="reportDetails__name">{report.name}</h2>
      <div className="reportDetails__optionsContainer">
        <button className="reportDetails__optionsContainer__deleteButton">
          <Trash2 />
        </button>
        <button className="reportDetails__optionsContainer__deleteButton">
          <Pencil />
        </button>
      </div>
    </div>
  );
}

export default ReportDetails;
