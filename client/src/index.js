import React, { useState } from "react";
import ReactDOM from "react-dom";
import Saved from "./components/Saved";
import Results from "./components/Results";
import Login from "./components/auth/Login";

import "./styles.css";

const App = () => {
  const [active, onActive] = useState("Home");
  const [token, onToken] = useState("");

  return (
    <div className="container">
      <button onClick={() => onActive("Home")}>Home</button>
      <button onClick={() => onActive("Saved")}>Saved</button>
      <button onClick={() => onActive("Search")}>Search</button>
      <button onClick={() => onActive("Login")}>Login</button>

      <div className="content">
        {active === "Saved" && <Saved />}
        {active === "Search" && <Results token={token} />}
        {active === "Home" && <div>Home</div>}
        {active === "Login" && <Login onToken={onToken} />}
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
