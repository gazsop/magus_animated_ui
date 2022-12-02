import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./assets/constants";

import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./context/app.context";

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={SEO_DATA.DESCRIPTION.CONTENT} />
      <title>{SEO_DATA.TITLE}</title>
    </Helmet>
    <React.StrictMode>
      <Router>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>
    </React.StrictMode>
  </>
);