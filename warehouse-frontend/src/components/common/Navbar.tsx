import "./Navbar.scss";
import { Link } from "react-router-dom";
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
  // --- USER INFO ---
  const { user } = useAuth();

  // --- LOG OUT HOOK ---
  const logout = useLogout();

  // --- MENU OPEN VARIABLE ---
  const [menuOpen, setMenuOpen] = useState(false);

  // --- MENU TOGGLE FUNCTION ---
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    // Navigation bar
    <nav className="navbar">
      {/* Title and logo icon */}
      <div className="navbar__logo">
        <PackageCheck className="navbar__logo__icon" />
        <h1 className="navbar__logo__title">Warehouse Manager</h1>
      </div>
      {/* Hamburger menu button */}
      <button className="navbar__hamburger" onClick={toggleMenu}>
        {menuOpen ? <X /> : <Menu />}
      </button>
      {/* Menu elements, navigation bar links */}
      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {/* Home */}
        <li>
          <Link
            className="navbar__links__item"
            to="/"
            onClick={() => toggleMenu()}
          >
            <Home className="navbar__links__item__icon" />
            <div>Home</div>
          </Link>
        </li>
        {user ? (
          <>
            {/* Warehouses */}
            <li>
              <Link
                className="navbar__links__item"
                to="/warehouses"
                onClick={() => toggleMenu()}
              >
                <Warehouse className="navbar__links__item__icon" />
                <div>Warehouses</div>
              </Link>
            </li>
            {/* Products */}
            <li>
              <Link
                className="navbar__links__item"
                to="/products"
                onClick={() => toggleMenu()}
              >
                <Package className="navbar__links__item__icon" />
                <div>Products</div>
              </Link>
            </li>
            {/* Companies */}
            <li>
              <Link
                className="navbar__links__item"
                to="/companies"
                onClick={() => toggleMenu()}
              >
                <Briefcase />
                Companies
              </Link>
            </li>
            {/* Movements */}
            <li>
              <Link
                className="navbar__links__item"
                to="/stockmovements"
                onClick={() => toggleMenu()}
              >
                <Truck className="navbar__links__item__icon" />
                <div>Movements</div>
              </Link>
            </li>
            {/* Reports */}
            <li>
              <Link
                className="navbar__links__item"
                to="/reports"
                onClick={() => toggleMenu()}
              >
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
            {/* Statistics */}
            <li>
              <Link
                className="navbar__links__item"
                to="/statistics"
                onClick={() => toggleMenu()}
              >
                <BarChart3 className="navbar__links__item__icon" />
                <div>Statistics</div>
              </Link>
            </li>
            {/* Users */}
            <li>
              <Link
                className="navbar__links__item"
                to="/users"
                onClick={() => toggleMenu()}
              >
                <Users className="navbar__links__item__icon" />
                <div>Users</div>
              </Link>
            </li>
          </>
        )}
        {user ? (
          <>
            {/* Logout */}
            <li>
              <Link
                className="navbar__links__item"
                to="/"
                onClick={() => (toggleMenu(), logout())}
              >
                <LogOut className="navbar__links__item__icon" />
                <div>Log out</div>
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* Login */}
            <li>
              <Link
                className="navbar__links__item"
                to="/login"
                onClick={() => toggleMenu()}
              >
                <LogInIcon className="navbar__links__item__icon" />
                <div>Login</div>
              </Link>
            </li>
            {/* Registration */}
            <li>
              <Link
                className="navbar__links__item"
                to="/registration"
                onClick={() => toggleMenu()}
              >
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
