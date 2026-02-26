import { createContext, use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [savedToken, setSavedToken] = useState("");
  const [users, setUsers] = useState([]);
  const [logged, setLogged] = useState(false);

  const getAllUser = async () => {
    try {
      const response = await fetch("http://localhost:4545/users", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      setUsers(data.users.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSingleUser = async (token) => {
    try {
      const decoded = jwtDecode(token);

      const response = await fetch(`http://localhost:4545/user/${decoded.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLogged(false);
      setSavedToken("");
      setUser({});

      return;
    }

    setLogged(true);
    setSavedToken(token);
    getSingleUser(token);
    getAllUser();
  }, [savedToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        savedToken,
        users,
        setUsers,
        logged,
        setLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
