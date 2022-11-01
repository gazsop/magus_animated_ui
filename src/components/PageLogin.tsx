import React, { useRef, useState } from "react";
import { useApp } from "../context/app.context";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";

export function Login() {
  const { getUserData, setUserData } = useApp();
  const [pageState, setPageState] = useState<number>(1);
  const loginBtn = useRef<HTMLButtonElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  const userPwdRef = useRef<HTMLInputElement>(null);

  //  console.log(getUserData());
   
  const validUId = new RegExp("", "i");
  const handleLoginBtn = (e: React.MouseEvent, action = "incr") => {
    e.preventDefault();

    if (pageState === 1) {
      if(!userIdRef.current?.value) return false
      setPageState(pageState + 1)
      return setUserData({
        uid: userIdRef.current.value
      });
    }
    
    if (pageState === 2) {
      // const userNewPwdState = {
      //   pwd: userPwdRef.current?.value ?? "",
      //   loginPage:
      //     action === "incr"
      //       ? pageState + 1
      //       : pageState - 1,
      // };
      if(!userPwdRef.current?.value) return false
      setPageState(action === "incr"
            ? pageState + 1
            : pageState - 1,);
      setUserData({
        pwd: userPwdRef.current.value
      })
    }
  };

  const handleCheckbox = () => {
    setUserData({
      keepLoggedIn: !getUserData().keepLoggedIn
    });
  };

  return (
    <Form className="login-form py-4 px-3 mx-auto">
      <Row>
        <Col>
          <Image fluid src={logo} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Bejelentkezés</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {pageState === 1 && (
            <>
              <p className="my-1">Folytatáshoz írd be a felhasználóneved!</p>
              <Form.Group controlId="formUserName">
                <Form.Control
                  type="text"
                  ref={userIdRef}
                  autoFocus={true}
                  autoComplete={"off"}
                  placeholder="Ide a nevedet írd be"
                />
              </Form.Group>
            </>
          )}
          {pageState === 2 && (
            <>
              <p className="my-1">Írd be a jelszavadat!</p>
              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  ref={userPwdRef}
                  autoFocus={true}
                  autoComplete={"off"}
                  placeholder="Jelszó"
                />
              </Form.Group>
            </>
          )}
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <LinkContainer to={"/"} className="login-link">
            <Nav.Link disabled>{"Nincs felhasználód?"}</Nav.Link>
          </LinkContainer>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <LinkContainer to={"/"} className="login-link">
            <Nav.Link disabled>{"Nem tudsz belépni?"}</Nav.Link>
          </LinkContainer>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Form.Group className="mb-3" controlId="login-keep-logged-in">
            <Form.Check
              type="checkbox"
              checked={getUserData().keepLoggedIn}
              onChange={() => handleCheckbox()}
              label="Maradjak bejelentkezve"
              disabled
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {pageState === 2 && (
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              ref={loginBtn}
              onClick={(event) => handleLoginBtn(event, "decr")}
            >
              Vissza
            </Button>
          )}
        </Col>
        <Col>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            ref={loginBtn}
            onClick={(event) => handleLoginBtn(event)}
          >
            {pageState === 1 ? "Tovább" : "Bejelentkezés"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
