import "./UsersPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import { LayoutList } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import UserList from "../../components/users/UserList.tsx";
import ErrorWindow from "../../components/common/ErrorWindow.tsx";
import ProtectedRoute from "../../components/authorization/ProtectedRoute.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";

function UsersPage() {
  return (
    // Users page
    <div className="usersPage">
      <Routes>
        {/* Users list */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
              {/* Page header */}
              <div className="usersPage__header">
                <BackButton />
                {/* Title */}
                <h2 className="usersPage__header__title">
                  <LayoutList />
                  Users
                </h2>
              </div>
              {/* List component */}
              <UserList />
            </ProtectedRoute>
          }
        />
        {/* NOT FOUND PAGE */}
        <Route
          path="/*"
          element={<ErrorWindow text={"404 Not found"} statusCode={404} />}
        />
      </Routes>
    </div>
  );
}

export default UsersPage;
