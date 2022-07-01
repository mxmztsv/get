import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-rangeslider/lib/index.css";
import App from "./App";
import { ToastObj } from "./components/Toast";
import "./index.css";

Sentry.init({
  dsn: "https://175027d891c04234a734da110d9790cc@o1284454.ingest.sentry.io/6495200",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <>
    <ToastObj />
    <App />
  </>
  // </React.StrictMode>
);
