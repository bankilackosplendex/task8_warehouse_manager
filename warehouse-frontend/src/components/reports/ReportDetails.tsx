import "./ReportDetails.scss";
import { Download, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { downloadWarehouseReportById, getWarehouseReportById } from "../../services/reportService.tsx";
import { Report } from "../../types/ReportType.tsx";
import { getWarehouseById } from "../../services/warehouseService.tsx";

function ReportDetails() {
  const { reportId } = useParams();

  const [report, setReport] = useState<Report>([]);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      if (reportId) {
        try {
          const data = await getWarehouseById(+reportId);
          report.name = data.name + " report";
          const blob = await getWarehouseReportById(+reportId);
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        } catch (err) {
          console.error("Failed to fetch PDF", err);
        }
      }
    };

    fetchReport();

    return () => {
      URL.revokeObjectURL(pdfUrl);
    };
  }, [reportId]);

  function downloadReport() {
    if (reportId) downloadWarehouseReportById(+reportId);
  }

  return (
    <div className="reportDetails">
      <h2 className="reportDetails__name">{report.name}</h2>
      <div className="reportDetails__iframeContainer">
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="800px"
          ></iframe>
        )}
      </div>
      <div className="reportDetails__optionsContainer">
        <button className="reportDetails__optionsContainer__deleteButton">
          <Trash2 />
        </button>
        <button className="reportDetails__optionsContainer__modifyButton">
          <Pencil />
        </button>
        <button className="reportDetails__optionsContainer__downloadButton" onClick={() => downloadReport()}>
          <Download />
        </button>
      </div>
    </div>
  );
}

export default ReportDetails;
