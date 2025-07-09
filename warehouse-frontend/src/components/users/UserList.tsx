import "./UserList.scss";
import { ShieldUser, User } from "lucide-react";
import { getUsers } from "../../services/userService.tsx";
import { useState, useEffect } from "react";
import { Role } from "../../enums/UserRoleEnum.tsx";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Couldn't load users";
        setError(msg);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="userList">
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
