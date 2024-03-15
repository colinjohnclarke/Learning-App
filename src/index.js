import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID;

// const AuthProvider = ({ domain, clientId, redirectUri }) => {
//   const onRedirectCallback = (appState) => {
//     // handle the redirect callback
//   };
// redirectUri={"https://spsdevtest.netlify.app"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // redirectUri={"http://localhost:3000/dashboard"}
      redirectUri={"https://spsdevtest.netlify.app/dashboard"}
      scope="openid email"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
