import "./UsersPage.scss";
import BackButton from "../../components/common/BackButton.tsx";
import { LayoutList } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import UserList from "../../components/users/UserList.tsx";

function UsersPage() {
  return (
    // Users page
    <div className="usersPage">
      <Routes>
        {/* Users list */}
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default UsersPage;
