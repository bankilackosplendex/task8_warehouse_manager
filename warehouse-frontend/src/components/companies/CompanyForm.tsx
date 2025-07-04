import { SquarePlus } from "lucide-react";
import "./CompanyForm.scss";

function CompanyForm() {
  return (
    // Company form
    <form className="companyForm" method="post">
      {/* Title */}
      <h2 className="companyForm__title">Add new company</h2>
      {/* Name */}
      <label className="companyForm__nameLabel" htmlFor="name">
        Name
      </label>
      <input
        className="companyForm__nameField"
        type="text"
        name="name"
        required
      />
      {/* Add button */}
      <button className="companyForm__button" type="submit">
        <SquarePlus />
        Add
      </button>
    </form>
  );
}

export default CompanyForm;
