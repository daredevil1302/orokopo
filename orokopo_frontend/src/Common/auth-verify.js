import React from "react";
import { withRouter } from "react-router-dom";

const AuthVerify = ({ history, logout }) => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
      }
    }
  });

  return <div></div>;
};

export default withRouter(AuthVerify);
