import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./Components/App/App";
import reportWebVitals from "./reportWebVitals";

// Routing
import { BrowserRouter as Router } from "react-router-dom";

// Context
import { CurrentUserProvider } from "./Context/userContext";

// react helmet
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <HelmetProvider>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </HelmetProvider>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
