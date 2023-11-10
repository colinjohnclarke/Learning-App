import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={
        `https://spsdevtest2.netlify.app/`
        // ||
        // // "http://localhost:3001/dashboard" ||
        // // "http://localhost:3002/dashboard"
      }
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
