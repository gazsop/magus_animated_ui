import Nav from "react-bootstrap/Nav";
import { Link, Navigate, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { NAV, TPage } from "../assets/nav";
import { USER } from "../assets/constants";
import { useApp } from "../context/app.context";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

function NavContainer() {
  const { getUserData, logout } = useApp();
  const [hasFocus, setHasFocus] = useState<boolean>(true);
  const focusLightColor = hasFocus ? "green" : "red";
  useEffect(()=>{
    window.addEventListener("focus", ()=>setHasFocus(true));
    window.addEventListener("blur", ()=>setHasFocus(false));
  },[])
  return (
    <Navbar expand="md">
      <LinkContainer
        to="/"
        onClick={(e) => {
          e.preventDefault();
        }}
        className="mx-3"
      >
        <Navbar.Brand>M.A.G.U.S.</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {NAV.PAGES.map((menuItem: TPage, index) => {
            let render = false;
            if (getUserData.rank === USER.RANK.ADMIN) render = true;
            else if (
              menuItem.RANG_REQ === USER.RANK.USER &&
              menuItem.RANG_REQ === getUserData.rank
            )  render = true;
            if (render)
              return (
                <LinkContainer key={`321${index}`} to={menuItem.HREF}>
                  <Nav.Link key={index}>{menuItem.TEXT}</Nav.Link>
                </LinkContainer>
              );
          })}
        </Nav>
      </Navbar.Collapse>
          <div style={{borderRadius: "50%", height:"30px", width:"30px", marginRight: "10px", backgroundColor: focusLightColor}}></div>
    </Navbar>
  );
}

export default NavContainer;

/* 
            <li key={`menu-li-${menuItem.HREF}`}>
              <Link to={menuItem.HREF}>{menuItem.TEXT}</Link>
            </li>
            <LinkContainer to="/advantures">
              <Nav.Link>Service</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/character">
              <Nav.Link>About</Nav.Link>
            </LinkContainer> */

/* <Row>
        <Col>
          <nav>
            <ul>
              {NAV.PAGES.map((menuItem: TPage) => {
                let render = false;
                // if(menuItem.RANG_REQ == USER.RANK.UNAUTH) render = true;
                if (
                  menuItem.RANG_REQ === USER.RANK.USER &&
                  menuItem.RANG_REQ === user.rank
                )
                  render = true;
                else if (user === USER.RANK.ADMIN) render = true;
                if (render)
                  return (
                    <li key={`menu-li-${menuItem.HREF}`}>
                      <Link to={menuItem.HREF}>{menuItem.TEXT}</Link>
                    </li>
                  );
              })}
            </ul>
          </nav>
        </Col>
      </Row>
    </> */
