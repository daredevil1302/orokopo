import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { useUser } from "./UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Homepage from "./Pages/Homepage/Homepage";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const token = user.accessToken;
    console.log(token);
    axios.defaults.headers.common = {
      Authorization: "Bearer " + token,
    };
  }

  return (
    <Router>
      <div className="App">
        <Homepage />
      </div>
    </Router>
  );
}

export default App;
