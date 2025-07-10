import { Link, useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useAuth } from "../../hooks/useAuth.tsx";

function HomePage() {
  // --- USER INFO ---
  const { user } = useAuth();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- NAVIGATION CONTROLLER FUNCTION ---
  function handleNavigation(path: string) {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  }

  return (
    // Home page
    <div className="homePage">
      {/* Title */}
      <h1 className="homePage__title">Warehouse Manager</h1>
      {/* Link cards */}
      <div className="homePage__linkCardContainer">
        {/* Warehouse link card */}
        <div
          className="homePage__linkCardContainer__warehouseCard"
          onClick={() => handleNavigation("/warehouses")}
        >
          <h2 className="homePage__linkCardContainer__warehouseCard__title">
            Warehouses
          </h2>
        </div>
        {/* Product link card */}
        <div
          className="homePage__linkCardContainer__productCard"
          onClick={() => handleNavigation("/products")}
        >
          <h2 className="homePage__linkCardContainer__productCard__title">
            Products
          </h2>
        </div>
        {/* Company link card */}
        <div
          className="homePage__linkCardContainer__companyCard"
          onClick={() => handleNavigation("/companies")}
        >
          <h2 className="homePage__linkCardContainer__companyCard__title">
            Companies
          </h2>
        </div>
        {/* Stockmovement link card */}
        <div
          className="homePage__linkCardContainer__stockmovementCard"
          onClick={() => handleNavigation("/stockmovements")}
        >
          <h2 className="homePage__linkCardContainer__stockmovementCard__title">
            Stockmovements
          </h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
