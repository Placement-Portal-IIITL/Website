import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./Components/App/App";
import reportWebVitals from "./reportWebVitals";

// Context
import { CurrentUserProvider } from "./Context/userContext";

// Page Title

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>
);
reportWebVitals();
