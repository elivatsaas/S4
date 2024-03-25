import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { preload } from "swr";
import {
  getSchedules,
  schedulesUrlEndpoint as cacheKey1,
} from "./api/schedulesApi";

preload(cacheKey1, getSchedules);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
