import "./ReportDetails.scss";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  downloadWarehouseReportById,
  getWarehouseReportById,
} from "../../services/reportService.tsx";
import { Report } from "../../types/ReportType.tsx";
import { getWarehouseById } from "../../services/warehouseService.tsx";

function ReportDetails() {
  // --- REPORT ID URL PARAMETER ---
  const { reportId } = useParams();

  // --- REPORT ENTITY ---
  const [report, setReport] = useState<Report>([]);

  // --- PDF URL FOR IFRAME PREVIEW ---
  const [pdfUrl, setPdfUrl] = useState<string>("");

  // --- ERROR STATE ---
  const [error, setError] = useState("");

  // --- FETCH REPORT PDF AND WAREHOUSE NAME ---
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

  // --- DOWNLOAD REPORT FUNCTION ---
  function downloadReport() {
    if (reportId) downloadWarehouseReportById(+reportId);
  }

  return (
    // Report details
    <div className="reportDetails">
      {/* Name */}
      <h2 className="reportDetails__name">{report.name}</h2>
      {/* PDF Preview */}
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
      {/* Options */}
      <div className="reportDetails__optionsContainer">
        {/* Download button */}
        <button
          className="reportDetails__optionsContainer__downloadButton"
          onClick={() => downloadReport()}
        >
          <Download />
        </button>
      </div>
    </div>
  );
}

export default ReportDetails;
