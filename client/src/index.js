import React, { useState } from "react";
import ReactDOM from "react-dom";
import Saved from "./Saved";
import Results from "./Results";

import "./styles.css";

const App = () => {
  const [active, onActive] = useState("Home");

  return (
    <div className="container">
      <button onClick={() => onActive("Home")}>Home</button>
      <button onClick={() => onActive("Saved")}>Saved</button>
      <button onClick={() => onActive("Search")}>Search</button>

      <div className="content">
        {active === "Saved" && <Saved />}
        {active === "Search" && <Results />}
        {active === "Home" && <div>Home</div>}
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
