import { Route, Routes } from "react-router-dom";
import Navbar from './components/common/Navbar.tsx';
import HomePage from "./pages/HomePage/HomePage.tsx";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage.tsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.tsx";
import CompaniesPage from "./pages/CompaniesPage/CompaniesPage.tsx";
import StockMovementsPage from "./pages/StockMovementsPage/StockMovementsPage.tsx";
import ReportsPage from "./pages/ReportsPage/ReportsPage.tsx";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/warehouses" element={<WarehousesPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/stockmovements" element={<StockMovementsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegisterPage />} />
    </Routes>
    </div>
    
  );
}

export default App;
