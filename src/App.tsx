import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button, Col, Row } from "react-bootstrap";

import { ProtectedRoute } from "./utils/protectedRoutes";
import { useApp } from "./context/app.context";
import NavContainer from "./components/Nav";
import { NAV, TNavDefault } from "./assets/nav";
import { USER } from "./assets/constants";

import "./assets/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Debug } from "./components/Debug";
import { FrontEndError } from "./components/elements/Error";
import Loading from "./components/elements/Loading";

function App() {
  // console.log(import.meta.);
  const {
    getUserData,
    getDebugWindow,
    toggleDebugWindow,
    getAppError,
    getInterfaceTheme,
    getLoading,
    getAppStatus
  } = useApp();

  const isAutherized = () => {
    if (getUserData().rank === USER.RANK.UNAUTH) return false;
    return true;
  };

  const indexElement: () => React.ReactElement = () => {
    let returnJSX: TNavDefault;
    if (getUserData().rank === USER.RANK.UNAUTH) {
      returnJSX = NAV.DEFAULT(USER.RANK.UNAUTH);
    } else {
      returnJSX = NAV.DEFAULT(USER.RANK.USER);
    }
    if (typeof returnJSX === "undefined")
      returnJSX = {
        HREF: "login",
        COMPONENT: <Navigate to={NAV.DEFAULT(USER.RANK.USER).HREF} replace />,
      };
    return returnJSX.COMPONENT;
  };

  // console.log("getDebugWindow");
  // console.log(getDebugWindow);
  // console.log("getAppError");
  // console.log(getAppError);
  // console.log("getLoading")
  // console.log(getLoading)
  // console.log(getLoading.length);
  
  // if(getLoading.length > 0) return (<Loading />)
  return (
    <>
    {getLoading.length > 0 && <Loading />}
      {getUserData().rank !== USER.RANK.UNAUTH && <NavContainer />}
      <Container fluid className={`screen-cover ${getInterfaceTheme}`}>
        <Row className="justify-content-center">
          {getAppStatus && getDebugWindow && <Debug />}
          <Col lg={8} md={8} sm={12} className="">
            {getAppError && Object.keys(getAppError).length !== 0 && <FrontEndError />}
            <Routes>
              <Route
                index
                element={
                  <ProtectedRoute isAllowed={!isAutherized()}>
                    {indexElement()}
                  </ProtectedRoute>
                }
              />
              {NAV.PAGES.map((page) => {
                return (
                  <Route
                    path={page.HREF}
                    key={page.HREF}
                    element={
                      <ProtectedRoute isAllowed={isAutherized()}>
                        {page.COMPONENT}
                      </ProtectedRoute>
                    }
                  />
                );
              })}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
            {getAppStatus && (
              <div
                className="position-absolute"
                style={{
                  bottom: "5px",
                  right: "5px",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDebugWindow();
                    console.log("getDebugWindow");
                    console.log(getDebugWindow);
                  }}
                >
                  Debug
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

/*
  <NavContainer />
      <div className="screen-container">
        <Container fluid>
          <Row className="justify-content-center">
            {process.env.NODE_ENV === "development" && debugWindow && <Debug />}
            <Col xs={8}>
              <Routes>
                <Route
                  index
                  element={
                    <ProtectedRoute isAllowed={!isAutherized()}>
                      {indexElement()}
                    </ProtectedRoute>
                  }
                />
                {NAV.PAGES.map((page) => {
                  return (
                    <Route
                      path={page.HREF}
                      key={page.HREF}
                      element={
                        <ProtectedRoute isAllowed={isAutherized()}>
                          {page.COMPONENT}
                        </ProtectedRoute>
                      }
                    />
                  );
                })}
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
              {!development && (
                <div
                  className="position-absolute"
                  style={{
                    bottom: "5px",
                    right: "5px",
                  }}
                >
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setDebugWindow(!debugWindow);
                    }}
                  >
                    Trigger debug
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      <div />
    </>
*/
