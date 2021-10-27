import React, { useState, useContext, useEffect } from "react";

const UserContext = React.createContext(undefined);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function loginUser(data) {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(JSON.parse(localStorage.getItem("user")));
  }
  function logoutUser() {
    localStorage.clear();
    setUser(null);
  }
  const data = [user, loginUser, logoutUser];

  return <UserContext.Provider value={data}>{children} </UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
