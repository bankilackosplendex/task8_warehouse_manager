import { useNavigate } from "react-router-dom";
import "./ReportList.scss";
import { Download, Eye, FileText } from "lucide-react";
import {
  downloadWarehouseReportById,
} from "../../services/reportService.tsx";
import { useState, useEffect } from "react";
import { getWarehouses } from "../../services/warehouseService.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";

function ReportList() {
  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- WAREHOUSE ENTITY ---
  const [warehouseReports, setWarehouseReports] = useState<Warehouse[]>([]);

  // --- ERROR ---
  const [error, setError] = useState("");

  // --- FETCH THE REPORTS DATA FROM BACKEND ---
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const data = await getWarehouses();
        setWarehouseReports(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load warehouses";
        setError(msg);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    // Report list
    <div className="reportList">
      {/* Report records */}
      {warehouseReports.map((report) => (
        <div className="reportList__item" key={report.id}>
          <div className="reportList__item__name">
            <FileText />
            {report.name} report
          </div>
          <div className="reportList__item__optionsContainer">
            {/* Preview button */}
            <button
              className="reportList__item__optionsContainer__previewButton"
              onClick={(e) => {
                navigate(`/reports/${report.id}`);
              }}
            >
              <Eye />
            </button>
            {/* Download button */}
            <button
              className="reportList__item__optionsContainer__downloadButton"
              onClick={(e) => {
                e.preventDefault();
                downloadWarehouseReportById(+report.id);
              }}
            >
              <Download />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportList;
