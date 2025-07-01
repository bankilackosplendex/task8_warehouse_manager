import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* --- HOME PAGE --- */}
        <Route path="/" element={<HomePage />} />
        {/* --- WAREHOUSE PAGE --- */}
        <Route path="/warehouses" element={<WarehousesPage />} />
        <Route
          path="/warehouses/:warehouseName"
          element={<WarehouseDetails />}
        />
        {/* --- PRODUCT PAGE --- */}
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/products/:productName"
          element={<ProductDetails />}
        />
        {/* --- COMPANY PAGE --- */}
        <Route path="/companies" element={<CompaniesPage />} />
        <Route
          path="/companies/:companyName"
          element={<CompanyDetails />}
        />
        {/* --- STOCKMOVEMENT PAGE --- */}
        <Route path="/stockmovements" element={<StockMovementsPage />} />
        <Route
          path="/stockmovements/:stockMovementName"
          element={<StockMovementDetails />}
        />
        {/* --- REPORTS PAGE --- */}
        <Route path="/reports" element={<ReportsPage />} />
        {/* --- STATISTICS PAGE --- */}
        <Route path="/statistics" element={<StatisticsPage />} />
        {/* --- LOGIN PAGE --- */}
        <Route path="/login" element={<LoginPage />} />
        {/* --- REGISTRATION PAGE --- */}
        <Route path="/registration" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
