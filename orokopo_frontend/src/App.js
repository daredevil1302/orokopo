import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";

import { BrowserRouter as Router } from "react-router-dom";

import Homepage from "./Pages/Homepage/Homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Homepage />
      </div>
    </Router>
  );
}

export default App;
