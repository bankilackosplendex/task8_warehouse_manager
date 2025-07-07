import { Link } from "react-router-dom";
import "./Navbar.scss";
import { Role } from "../../enums/UserRoleEnum.tsx";
import {
  Home,
  Warehouse,
  Package,
  Briefcase,
  Truck,
  BarChart3,
  FileText,
  LogOut,
  LogInIcon,
  UserPlus,
  Users,
  PackageCheck,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useLogout } from "../../hooks/useLogOut.tsx";
import { useState } from "react";

function Navbar() {
  const { user } = useAuth();
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <PackageCheck className="navbar__logo__icon" />
        <h1 className="navbar__logo__title">Warehouse Manager</h1>
      </div>
      <button className="navbar__hamburger" onClick={toggleMenu}>
        {menuOpen ? <X /> : <Menu />}
      </button>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        <li>
          <Link className="navbar__links__item" to="/">
            <Home className="navbar__links__item__icon" />
            <div>Home</div>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link className="navbar__links__item" to="/warehouses">
                <Warehouse className="navbar__links__item__icon" />
                <div>Warehouses</div>
              </Link>
            </li>
            <li>
              <Link className="navbar__links__item" to="/products">
                <Package className="navbar__links__item__icon" />
                <div>Products</div>
              </Link>
            </li>
            <li>
              <Link className="navbar__links__item" to="/companies">
                <Briefcase />
                Companies
              </Link>
            </li>
            <li>
              <Link className="navbar__links__item" to="/stockmovements">
                <Truck className="navbar__links__item__icon" />
                <div>Movements</div>
              </Link>
            </li>
            <li>
              <Link className="navbar__links__item" to="/reports">
                <FileText className="navbar__links__item__icon" />
                <div>Reports</div>
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {user?.role === Role.ADMIN && (
          <>
            <li>
              <Link className="navbar__links__item" to="/statistics">
                <BarChart3 className="navbar__links__item__icon" />
                <div>Statistics</div>
              </Link>
            </li>
            <li>
              <Link className="navbar__links__item" to="/users">
                <Users className="navbar__links__item__icon" />
                <div>Users</div>
              </Link>
            </li>
          </>
        )}
        {user ? (
          <li onClick={logout}>
            <Link className="navbar__links__item" to="/">
              <LogOut className="navbar__links__item__icon" />
              <div>Log out</div>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link className="navbar__links__item" to="/login">
                <LogInIcon className="navbar__links__item__icon" />
                <div>Login</div>
              </Link>
            </li>
            <li>
              <Link className="navbar__links__item" to="/registration">
                <UserPlus className="navbar__links__item__icon" />
                <div>Registration</div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
