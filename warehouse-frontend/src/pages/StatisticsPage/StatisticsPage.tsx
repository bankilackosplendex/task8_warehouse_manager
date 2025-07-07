import "./StatisticsPage.scss";
import StatisticsList from "../../components/statistics/StatisticsList.tsx";
import BackButton from "../../components/common/BackButton.tsx";

function StatisticsPage() {
  return (
    <div className="statisticsPage">
      <BackButton />
      <h2 className="statisticsPage__title">Statistics</h2>
      <StatisticsList />
    </div>
  );
}

export default StatisticsPage;
