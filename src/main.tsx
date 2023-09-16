import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./assets/constants";

import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import AppProvider from "./core/App";
import favicon from "./assets/favicon.ico";

import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button, Col, Row } from "react-bootstrap";

import { ProtectedRoute } from "./core/FrontEndRouter_ProtectedRoutes";
import { useApp } from "./core/App";
// import { NAV } from "./assets/nav";
import { USER } from "./assets/constants";

import "./assets/css/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FrontEndError } from "./components/elements/Error";
import Loading from "./components/elements/Loading";
import { FrontEndRouter } from "./core/FrontEndRouter";

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
      <AppProvider>
        <FrontEndRouter />
      </AppProvider>
    </React.StrictMode>
  </>
);