import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/warehouses">Warehouses</Link>
      <Link to="/products">Products</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/stockmovements">Stackmovements</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/statistics">Statistics</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registration</Link>
    </div>
  );
}

export default Navbar;
