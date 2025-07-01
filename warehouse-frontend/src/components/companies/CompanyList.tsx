import { Link } from "react-router-dom";

function CompanyList() {
  return (
    <div>
      Companies List
      <Link to="/companies/company1">Company1</Link>
      <Link to="/companies/company2">Company 2</Link>
      <Link to="/companies/company3">Company 3</Link>
    </div>
  );
}

export default CompanyList;
