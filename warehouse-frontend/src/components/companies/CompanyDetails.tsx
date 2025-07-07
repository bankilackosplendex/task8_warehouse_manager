import "./CompanyDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyById } from "../../services/companyService.tsx";
import { Company } from "../../types/CompanyType";
import { Pencil, Trash2 } from "lucide-react";
import Backdrop from "../common/Backdrop.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";

function CompanyDetails() {
  const { companyId } = useParams();

  const [company, setCompany] = useState<Company>([]);
  const [error, setError] = useState("");
  const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompany = async () => {
      if (companyId) {
        try {
          const data = await getCompanyById(+companyId);
          data.movements = [
            {
              id: 1,
              movementType: "IMPORT",
              createdAt: new Date(),
            },
            {
              id: 2,
              movementType: "EXPORT",
              createdAt: new Date(),
            },
          ];
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

  return (
    <div className="companyDetails">
      <h2 className="companyDetails__name">{company.name}</h2>
      <div className="companyDetails__movements">
        <p className="companyDetails__movements__key">Stockmovements: </p>
        {company.movements &&
          company.movements.map((movement) => (
            <div className="companyDetails__movements__value" key={movement.id}>
              <div className="companyDetails__movements__value__id">
                #{movement.id}
              </div>
              <div className="companyDetails__movements__value__info">
                <p>{movement.movementType}</p>
                <p>{new Date(movement.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="companyDetails__optionsContainer">
        <button
          className="companyDetails__optionsContainer__deleteButton"
          onClick={() => setShowPopUpWindow(true)}
        >
          <Trash2 />
        </button>
        <button className="companyDetails__optionsContainer__modifyButton">
          <Pencil />
        </button>
      </div>
      {showPopUpWindow && <Backdrop closePopUpWindow={closeTab} />}
      {showPopUpWindow && (
        <PopUpWindow
          text={"Are you sure you want to delete company " + company.name +"?"}
          closePopUpWindow={closeTab}
          deleteItem={deleteCompany}
        />
      )}
    </div>
  );
}

export default CompanyDetails;
