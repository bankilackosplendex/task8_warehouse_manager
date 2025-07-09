import { Route, Routes } from "react-router-dom";
import "./index.scss";
import Navbar from "./components/common/Navbar.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage.tsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.tsx";
import CompaniesPage from "./pages/CompaniesPage/CompaniesPage.tsx";
import StockMovementsPage from "./pages/StockMovementsPage/StockMovementsPage.tsx";
import ReportsPage from "./pages/ReportsPage/ReportsPage.tsx";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import { Role } from "./enums/UserRoleEnum.tsx";
import ProtectedRoute from "./components/authorization/ProtectedRoute.tsx";
import UsersPage from "./pages/UsersPage/UsersPage.tsx";
import ErrorWindow from "./components/common/ErrorWindow.tsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* --- HOME PAGE --- */}
        <Route path="/" element={<HomePage />} />
        {/* --- WAREHOUSE PAGE --- */}
        <Route path="/warehouses/*" element={<WarehousesPage />} />
        {/* --- PRODUCT PAGE --- */}
        <Route path="/products/*" element={<ProductsPage />} />
        {/* --- COMPANY PAGE --- */}
        <Route path="/companies/*" element={<CompaniesPage />} />
        {/* --- STOCKMOVEMENT PAGE --- */}
        <Route path="/stockmovements/*" element={<StockMovementsPage />} />
        {/* --- REPORTS PAGE --- */}
        <Route path="/reports/*" element={<ReportsPage />} />
        {/* --- STATISTICS PAGE --- */}
        <Route
          path="/statistics/*"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
              <StatisticsPage />
            </ProtectedRoute>
          }
        />
        {/* --- LOGIN PAGE --- */}
        <Route path="/login" element={<LoginPage />} />
        {/* --- REGISTRATION PAGE --- */}
        <Route path="/registration" element={<RegisterPage />} />
        {/* --- USERS PAGE --- */}
        <Route path="/users" element={<UsersPage />} />
        {/* NOT FOUND PAGE */}
        <Route path="/*" element={<ErrorWindow text={"404 Not found"} statusCode={404}/>} />
      </Routes>
    </div>
  );
}

export default App;
