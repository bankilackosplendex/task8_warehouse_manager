import { Link, useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useAuth } from "../../hooks/useAuth.tsx";

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleNavigation(path: string) {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  }

  return (
    <div className="homePage">
      <h1 className="homePage__title">Warehouse Manager</h1>
      <div className="homePage__linkCardContainer">
        <div
          className="homePage__linkCardContainer__warehouseCard"
          onClick={() => handleNavigation("/warehouses")}
        >
          <h2 className="homePage__linkCardContainer__warehouseCard__title">
            Warehouses
          </h2>
        </div>
        <div
          className="homePage__linkCardContainer__productCard"
          onClick={() => handleNavigation("/products")}
        >
          <h2 className="homePage__linkCardContainer__productCard__title">
            Products
          </h2>
        </div>
        <div
          className="homePage__linkCardContainer__companyCard"
          onClick={() => handleNavigation("/companies")}
        >
          <h2 className="homePage__linkCardContainer__companyCard__title">
            Companies
          </h2>
        </div>
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
