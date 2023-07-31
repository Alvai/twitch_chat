import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// We can disable the eslint rule for the next line since #root always exists
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
