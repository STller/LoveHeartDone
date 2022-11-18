import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, redirect, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import List from "./pages/List";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/index/*" element={<List />}></Route>
        <Route path="/app/*" element={<App />} />
        <Route path="/*" element={<Navigate to={'/index'} replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
