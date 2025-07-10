import "./CompanyDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteCompany,
  getCompanyById,
} from "../../services/companyService.tsx";
import { Company } from "../../types/CompanyType";
import {
  ArrowLeftRight,
  CalendarDays,
  Package,
  Pencil,
  Trash2,
  Truck,
  Warehouse,
} from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

function CompanyDetails() {
  // --- USER INFO ---
  const { user } = useAuth();

  // --- COMPANY ID URL PARAMETER ---
  const { companyId } = useParams();

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- COMPANY ENTITY ---
  const [company, setCompany] = useState<Company>([]);

  // --- ERROR ---
  const [error, setError] = useState("");

  // --- SHOW POPUP WINDOW VARIABLE ---
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

  // --- FETCH THE COMPANY'S DATA FROM BACKEND ---
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

  // --- CLOSE POPUPWINDOW FUNCTION ---
  function closeTab(): void {
    setShowPopUpWindow(false);
  }

  // --- DELETE COMPANY FUNCTION ---
  const onDelete = async () => {
    if (companyId) {
      await deleteCompany(+companyId);
    }
    navigate(`/companies`);
  };

  // --- MODIFY COMPANY FUNCTION ---
  function modifyCompany(id: number): void {
    navigate(`/companies/modify/${id}`);
  }

  return (
    // Company details
    <div className="companyDetails">
      {/* Name */}
      <h2 className="companyDetails__name">{company.name}</h2>
      {/* Movements */}
      {company.movements && company.movements.length > 0 ? (
        <div className="companyDetails__movements">
          <div className="companyDetails__movements__key">
            <Truck className="companyDetails__movements__key__icon" />
            <p className="companyDetails__movements__key__text">Movements: </p>
          </div>
          <div className="companyDetails__movements__value">
            {/* Header */}
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
                Direction
              </p>
              <p className="companyDetails__movements__value__header__date">
                <CalendarDays />
                Date
              </p>
            </div>
            {/* Records */}
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
      {user?.role === Role.ADMIN && (
        // Options
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
      )}
      {/* Backdrop and popup window */}
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={"Are you sure you want to delete company " + company.name + "?"}
          closePopUpWindow={closeTab}
          deleteItem={onDelete}
        />
      )}
    </div>
  );
}

export default CompanyDetails;
