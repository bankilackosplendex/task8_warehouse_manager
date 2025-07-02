import "./StatisticsPage.scss";
import StatisticsList from "../../components/statistics/StatisticsList.tsx";

function StatisticsPage() {
  return (
    <div className="statisticsPage">
      <h2 className="statisticsPage__title">Statistics</h2>
      <StatisticsList />
    </div>
  );
}

export default StatisticsPage;
