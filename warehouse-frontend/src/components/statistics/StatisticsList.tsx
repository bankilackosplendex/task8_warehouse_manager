import "./StatisticsList.scss";
import { Link } from "react-router-dom";
import { Statistics } from "../../types/StatisticsType.tsx";
import { ChartColumn } from "lucide-react";

function StatisticsList() {
  // --- STATISTICS ---
  const statistics: Statistics[] = [
    { id: 1, name: "Top Suppliers", urlId: "topsuppliers" },
    { id: 2, name: "Top Customers", urlId: "topcostumers" },
    { id: 3, name: "Most Moved Products", urlId: "mostmovedproducts" },
  ];

  return (
    // Statistics list
    <div className="statisticsList">
      {/* Statistics records */}
      {statistics.map((statistic) => (
        <Link
          to={`/statistics/${statistic.urlId}`}
          key={statistic.id}
          className="statisticsList__item"
        >
          <ChartColumn />
          {statistic.name}
        </Link>
      ))}
    </div>
  );
}

export default StatisticsList;
