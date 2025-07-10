import { Link, useNavigate } from "react-router-dom";
import "./ReportList.scss";
import { Download, Eye, FileText } from "lucide-react";
import {
  downloadWarehouseReportById,
  getWarehouseReportById,
} from "../../services/reportService.tsx";
import { useState, useEffect } from "react";
import { getWarehouses } from "../../services/warehouseService.tsx";
import { Warehouse } from "../../types/WarehouseType.tsx";

function ReportList() {
  const navigate = useNavigate();

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [error, setError] = useState("");

  const reports = [
    { id: "1", name: "Daily report" },
    { id: "2", name: "Weekly report" },
    { id: "3", name: "Monthly report" },
  ];

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const data = await getWarehouses();
        setWarehouses(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load warehouses";
        setError(msg);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div className="reportList">
      {warehouses.map((report) => (
        <div className="reportList__item" key={report.id}>
          <div className="reportList__item__name">
            <FileText />
            {report.name} report
          </div>
          <div className="reportList__item__optionsContainer">
            <button
              className="reportList__item__optionsContainer__previewButton"
              onClick={(e) => {
                navigate(`/reports/${report.id}`);
              }}
            >
              <Eye />
            </button>
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
