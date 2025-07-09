import "./CompanyDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyById } from "../../services/companyService.tsx";
import { Company } from "../../types/CompanyType";
import {
  ArrowLeftRight,
  CalendarDays,
  Container,
  Package,
  Pencil,
  Trash2,
  Truck,
  Warehouse,
} from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import { getWarehouseById } from "../../services/warehouseService.tsx";
import { getProductById } from "../../services/productService.tsx";

function CompanyDetails() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState<Company>([]);
  const [error, setError] = useState("");
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompany = async () => {
      if (companyId) {
        try {
          const data = await getCompanyById(+companyId);
          setCompany(data);
        } catch (err: any) {
          const msg = err.response?.data?.message || "Couldn't load company";
          setError(msg);
        }
      }
    };

    fetchCompany();
  }, []);

  function closeTab(): void {
    setShowPopUpWindow(false);
  }

  function deleteCompany(): void {}

  function modifyCompany(id: number): void {
    navigate(`/companies/modify/${id}`);
  }

  return (
    <div className="companyDetails">
      <h2 className="companyDetails__name">{company.name}</h2>

      {company.movements ? (
        <div className="companyDetails__movements">
          <p className="companyDetails__movements__key">
            <Truck className="companyDetails__movements__key__icon" />
            <p className="companyDetails__movements__key__text">Movements: </p>
          </p>
          <div className="companyDetails__movements__value">
            <div className="companyDetails__movements__value__header">
              <p className="companyDetails__movements__value__header__warehouse">
                <Warehouse />
                Warehouse
              </p>
              <p className="companyDetails__movements__value__header__product">
                <Package />
                Product
              </p>
              <p className="companyDetails__movements__value__header__movementType">
                <ArrowLeftRight />
                Movement type
              </p>
              <p className="companyDetails__movements__value__header__date">
                <CalendarDays />
                Date
              </p>
            </div>
            {company.movements.map((movement) => (
              <Link
                to={`/stockmovements/${movement.id}`}
                className="companyDetails__movements__value__item"
                key={movement.id}
              >
                <div className="companyDetails__movements__value__item__warehouse">
                  {movement.warehouse?.name}
                </div>
                <div className="companyDetails__movements__value__item__product">
                  {movement.product?.name}
                </div>
                <div className="companyDetails__movements__value__item__movementType">
                  {movement.movementType}
                </div>
                <div className="companyDetails__movements__value__item__date">
                  {new Date(movement.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="companyDetails__movements companyDetails__empty">
          <div className="companyDetails__movements__key">
            <Truck className="companyDetails__movements__key__icon" />
            <p className="companyDetails__movements__key__text">Movements: </p>
          </div>
          <p className="companyDetails__movements__value">
            This company has no movements
          </p>
        </div>
      )}
      <div className="companyDetails__optionsContainer">
        <button
          className="companyDetails__optionsContainer__deleteButton"
          onClick={() => setShowPopUpWindow(true)}
        >
          <Trash2 />
        </button>
        <button
          className="companyDetails__optionsContainer__modifyButton"
          onClick={() => modifyCompany(company.id)}
        >
          <Pencil />
        </button>
      </div>
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={"Are you sure you want to delete company " + company.name + "?"}
          closePopUpWindow={closeTab}
          deleteItem={deleteCompany}
        />
      )}
    </div>
  );
}

export default CompanyDetails;
