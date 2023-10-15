import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./assets/constants";
import favicon from "./assets/favicon.ico";
import React, { useEffect } from "react";
import "./assets/css/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FrontEndRouter } from "./core/FrontEndRouter";
// import { FrontEndRouterHook } from "./core/FrontEndRouter_hook";

const main = ReactDOM.createRoot(
  document.getElementById("main") as HTMLElement
);
main.render(
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="icon" href={favicon} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={SEO_DATA.DESCRIPTION.CONTENT} />
      <title>{SEO_DATA.TITLE}</title>
    </Helmet>
    <React.StrictMode>
      <FrontEndRouter />
    </React.StrictMode>
  </>
);