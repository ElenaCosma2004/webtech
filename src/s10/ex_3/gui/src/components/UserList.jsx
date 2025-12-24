import { useEffect, useState } from "react";
import User from "./User.jsx";
import "./UserList.css";
import { get } from "http";
import PowerUser from "./PowerUser.jsx";

const SERVER = "http://localhost:8080";

const [selectedUser, setSelectedUser] = useState(null);

function UserList() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(`${SERVER}/users`);
    const data = await response.json();
    setUsers(data);
  };

  const addUser = async (user) => {
    await fetch(`${SERVER}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    getUsers();
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="user-list-container">
      <div className="user-list">
        {users.map((u) =>
          u.type === "power-user" ? (
            <PowerUser key={u.id} item={u} onClick={() => setSelectedUser(u)} />
          ) : (
            <User key={u.id} item={u} onClick={() => setSelectedUser(u)} />
          )
        )}
      </div>
      <UserForm onAdd={addUser}></UserForm>
      {selectedUser && <UserDetails user={selectedUser}></UserDetails>}
    </div>
  );
}
export default UserList;
