import Nav from "react-bootstrap/Nav";
import { Link, Navigate, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { NAV, TPage } from "../assets/nav";
import { USER } from "../assets/constants";
import { useApp } from "../context/app.context";
import { Col, Container, Navbar, Row } from "react-bootstrap";

function NavContainer() {
  const { getUserData, logout } = useApp();
  const login = (value: string) => {
    return (
      <Route path="/redirect-page" element={<Navigate to="/character" />} />
    );
  };
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
          {NAV.PAGES.map((menuItem: TPage) => {
            let render = false;
            if (getUserData().rank === USER.RANK.ADMIN) render = true;
            else if (
              menuItem.RANG_REQ === USER.RANK.USER &&
              menuItem.RANG_REQ === getUserData().rank
            )  render = true;
            if (render)
              return (
                <LinkContainer to={menuItem.HREF}>
                  <Nav.Link>{menuItem.TEXT}</Nav.Link>
                </LinkContainer>
              );
          })}
        </Nav>
      </Navbar.Collapse>
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
