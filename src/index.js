import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FilmsProvider from "./contexts/FilmsContext";
import CharactersProvider from "./contexts/CharactersContext";
import PlanetsProvider from "./contexts/PlanetsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FilmsProvider>
    <CharactersProvider>
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    </CharactersProvider>
  </FilmsProvider>
);

// strict mode removed

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
