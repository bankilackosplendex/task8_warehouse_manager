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
      <BackButton />
      {/* Title */}
      <h2 className="statisticsPage__title">Statistics</h2>
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
