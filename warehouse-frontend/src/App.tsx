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
import WarehouseDetails from "./components/warehouses/WarehouseDetails.tsx";
import ProductDetails from "./components/products/ProductDetails.tsx";
import CompanyDetails from "./components/companies/CompanyDetails.tsx";
import StockMovementDetails from "./components/stockmovements/StockMovementDetails.tsx";
import ReportDetails from "./components/reports/ReportDetails.tsx";
import CompanyForm from "./components/companies/CompanyForm.tsx";
import ProductForm from "./components/products/ProductForm.tsx";
import WarehouseForm from "./components/warehouses/WarehouseForm.tsx";
import StockMovementsForm from "./components/stockmovements/StockMovementForm.tsx";
import UserList from "./components/users/UserList.tsx";
import { useAuth } from "./components/hooks/useAuth.tsx";
import { Role } from "./enums/UserRoleEnum.tsx";
import ProtectedRoute from "./components/authorization/ProtectedRoute.tsx";
import { FormType } from "./enums/FormTypeEnum.tsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* --- HOME PAGE --- */}
        <Route path="/" element={<HomePage />} />
        {/* --- WAREHOUSE PAGE --- */}
        <Route path="/warehouses*" element={<WarehousesPage />} />
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
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
