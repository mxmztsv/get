import React from "react";
import ReactDOM from "react-dom/client";
import "react-rangeslider/lib/index.css";
import App from "./App";
import { ToastObj } from "./components/Toast";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <>
    <ToastObj />
    <App />
  </>
  // </React.StrictMode>
);
