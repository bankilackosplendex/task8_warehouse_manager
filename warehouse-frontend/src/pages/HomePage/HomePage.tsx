import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <h1 className="homePage__title">Warehouse Manager</h1>
      <div className="homePage__linkCardContainer">
        <Link
          className="homePage__linkCardContainer__linkCard"
          to="/warehouses"
        >
          <div className="homePage__linkCardContainer__linkCard__card homePage__linkCardContainer__linkCard__warehouseCard">
            <h2 className="homePage__linkCardContainer__linkCard__card__title">
              Warehouses
            </h2>
          </div>
        </Link>
        <Link className="homePage__linkCardContainer__linkCard" to="/products">
          <div className="homePage__linkCardContainer__linkCard__card homePage__linkCardContainer__linkCard__productCard">
            <h2 className="homePage__linkCardContainer__linkCard__card__title">
              Products
            </h2>
          </div>
        </Link>
        <Link className="homePage__linkCardContainer__linkCard" to="/companies">
          <div className="homePage__linkCardContainer__linkCard__card homePage__linkCardContainer__linkCard__companyCard">
            <h2 className="homePage__linkCardContainer__linkCard__card__title">
              Companies
            </h2>
          </div>
        </Link>
        <Link
          className="homePage__linkCardContainer__linkCard"
          to="/stockmovements"
        >
          <div className="homePage__linkCardContainer__linkCard__card homePage__linkCardContainer__linkCard__stockmovementCard">
            <h2 className="homePage__linkCardContainer__linkCard__card__title">
              Stockmovements
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
