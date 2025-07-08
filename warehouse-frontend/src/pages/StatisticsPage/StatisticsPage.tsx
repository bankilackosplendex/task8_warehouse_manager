import "./StatisticsPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import StatisticsList from "../../components/statistics/StatisticsList.tsx";
import ProtectedRoute from "../../components/authorization/ProtectedRoute.tsx";
import { Routes, Route } from "react-router-dom";
import { Role } from "../../enums/UserRoleEnum.tsx";

function StatisticsPage() {
  return (
    // Statistics page
    <div className="statisticsPage">
      <div className="statisticsPage__header">
        <BackButton />
        {/* Title */}
        <h2 className="statisticsPage__header__title">Statistics</h2>
      </div>
      {/* Routes in /statistics */}
      <Routes>
        {/* Statistics list */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
              <StatisticsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default StatisticsPage;
