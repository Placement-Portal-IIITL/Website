import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./Components/App/App";
import reportWebVitals from "./reportWebVitals";

// Routing
import { BrowserRouter as Router } from "react-router-dom";

// Context
import { CurrentUserProvider } from "./Context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </Router>
);
reportWebVitals();
