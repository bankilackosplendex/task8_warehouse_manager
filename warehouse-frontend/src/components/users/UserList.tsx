import "./UserList.scss";
import { ShieldUser, User } from "lucide-react";
import { getUsers } from "../../services/userService.tsx";
import { useState, useEffect } from "react";
import { Role } from "../../enums/UserRoleEnum.tsx";
import ErrorWindow from "../common/ErrorWindow.tsx";

function UserList() {
  // --- USER ENTITIES ---
  const [users, setUsers] = useState([]);

  // --- ERROR ---
  const [error, setError] = useState("");
  const [statusCode, setSatusCode] = useState<number>();

  // --- FETCH THE USERS DATA FROM BACKEND ---
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load users";
        setError(msg);
        setSatusCode(503);
      }
    };

    fetchCompanies();
  }, []);

  if (error)
    return (
      // Error window
      <ErrorWindow text={error} statusCode={statusCode} onClose={() => setError("")} />
    );

  return (
    // User list
    <div className="userList">
      {/* User records */}
      {users.map((user) => (
        <div key={user.id} className="userList__item">
          <p className="userList__item__email">
            {user.role == Role.ADMIN && <ShieldUser />}
            {user.role == Role.USER && <User />}
            {user.email}
          </p>
          <p className="userList__item__role">{user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
