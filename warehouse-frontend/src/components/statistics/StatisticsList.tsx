import { Link } from "react-router-dom";
import "./StatisticsList.scss";

function StatisticsList() {
  const statistics = [
    { id: "1", name: "Daily statistics" },
    { id: "2", name: "Weekly statistics" },
    { id: "3", name: "Monthly statistics" },
  ];
  
  return (
    <div className="statistic-list">
      {statistics.map((statistic) => (
        <Link
          to={`/statistic/${statistic.id}`}
          key={statistic.id}
          className="statistic-list__item"
        >
          {statistic.name}
        </Link>
      ))}
    </div>
  );
}

export default StatisticsList;
