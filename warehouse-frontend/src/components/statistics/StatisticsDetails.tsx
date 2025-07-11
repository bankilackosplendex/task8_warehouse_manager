import "./StatisticsDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCompanyNameById,
  getProductNameById,
  getStatisticByType,
} from "../../services/statisticsService.tsx";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ErrorWindow from "../common/ErrorWindow.tsx";

// --- REGISTER CHART.JS COMPONENTS ---
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StatisticsDetails() {
  // --- URL PARAMETER ---
  const { statId } = useParams();

  // --- CHART DATA STATE ---
  const [data, setData] = useState([]);

  // --- ERROR STATE ---
  const [error, setError] = useState("");
  const [statusCode, setSatusCode] = useState<number>();

  // --- TITLE MAPPING FOR CHARTS ---
  const statTitleMap: any = {
    topsuppliers: "Top suppliers",
    topcostumers: "Top customers",
    mostmovedproducts: "Most moved products",
  };

  // --- MAPPING: WHICH FIELD TO USE FOR Y-VALUES ---
  const valueFieldMap: Record<string, string> = {
    topsuppliers: "count",
    topcostumers: "count",
    mostmovedproducts: "quantity",
  };

  // --- MAPPING: WHICH ID FIELD TO USE FOR LOOKUPS ---
  const idFieldMap: Record<string, string> = {
    topsuppliers: "companyId",
    topcostumers: "companyId",
    mostmovedproducts: "productId",
  };

  // --- MAPPING: Y-AXIS LABEL ---
  const yAxisLabelMap: Record<string, string> = {
    topsuppliers: "EXPORT",
    topcostumers: "IMPORT",
    mostmovedproducts: "DB / KG",
  };

  // --- FETCH STATISTICS DATA ON COMPONENT MOUNT ---
  useEffect(() => {
    async function fetchData() {
      if (!statId) return;

      try {
        const rawData = await getStatisticByType(statId);

        const enrichedData = await Promise.all(
          rawData.map(async (item: any) => {
            const idField = idFieldMap[statId];
            const id = item[idField];
            let name = "";

            if (statId === "mostmovedproducts") {
              name = await getProductNameById(id);
            } else {
              name = await getCompanyNameById(id);
            }

            return {
              name,
              value:
                item._count?.id ||
                item._count ||
                item._sum?.quantity ||
                item.count ||
                item.quantity ||
                0,
            };
          })
        );

        setData(enrichedData);
      } catch (err) {
        setError("Couldn't load statistics");
        setSatusCode(503);
      }
    }

    fetchData();
  }, [statId]);

  // --- CHART DATA STRUCTURE ---
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: statTitleMap[statId || ""] || "Statistics",
        data: data.map((item) => item.value),
        backgroundColor: ["#2c3e50"],
        borderRadius: 6,
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // --- CHART OPTIONS CONFIG ---
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: statTitleMap[statId || ""] || "Statistics",
        font: { size: 30 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: {
          display: true,
          text: yAxisLabelMap[statId || ""] || "",
          font: { size: 14 },
        },
      },
    },
  };

  if (error)
    return (
      // Error window
      <ErrorWindow text={error} statusCode={statusCode} onClose={() => setError("")} />
    );

  return (
    <div className="statisticsDetails">
      {/* Title */}
      <h2 className="statisticsDetails__title">
        {statTitleMap[statId || ""] || "Statistics"}
      </h2>

      {/* Chart */}
      <div className="statisticsDetails__stats">
        {data.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}

export default StatisticsDetails;
