import "./StatisticsPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import StatisticsList from "../../components/statistics/StatisticsList.tsx";
import StatisticsDetails from "../../components/statistics/StatisticsDetails.tsx";
import ProtectedRoute from "../../components/authorization/ProtectedRoute.tsx";
import { Routes, Route } from "react-router-dom";
import { Role } from "../../enums/UserRoleEnum.tsx";
import { ChartColumnDecreasing, LayoutList } from "lucide-react";
import ErrorWindow from "../../components/common/ErrorWindow.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

function StatisticsPage() {
  // --- USER INFO ---
  const { user } = useAuth();

  if (!user)
    return (
      <ErrorWindow
        text="Access Denied"
        statusCode={401}
        onClose={function () {}}
      />
    );

  return (
    // Statistics page
    <div className="statisticsPage">
      {/* Routes in /statistics */}
      <Routes>
        {/* Statistics list */}
        <Route
          path="/"
          element={
            <>
              <div className="statisticsPage__header">
                <BackButton />
                {/* Title */}
                <h2 className="statisticsPage__header__title">
                  <LayoutList />
                  Statistics
                </h2>
              </div>
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <StatisticsList />
              </ProtectedRoute>
            </>
          }
        />
        {/* Statistics details */}
        <Route
          path="/:statId"
          element={
            <>
              <div className="statisticsPage__header">
                <BackButton />
                {/* Title */}
                <h2 className="statisticsPage__header__title">
                  <ChartColumnDecreasing />
                  Statistics chart
                </h2>
              </div>
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <StatisticsDetails />
              </ProtectedRoute>
            </>
          }
        />
        {/* NOT FOUND PAGE */}
        <Route
          path="/*"
          element={
            <ErrorWindow
              text={"404 Not found"}
              statusCode={404}
              onClose={function () {}}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default StatisticsPage;
