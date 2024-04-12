import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterDOM from "./Router";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterDOM />
  </React.StrictMode>
);
