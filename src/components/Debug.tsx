import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useApp } from "../context/app.context";

export function Debug() {
  const { toggleInterfaceTheme, getAppError, getAppData, setLoading } =
    useApp();

  const triggerError = () => {
    console.log("error triggered by button");
    throw new Error("asd");
  };

  return (
    <Col className="debug-container" xs={12} md={4}>
      <div className="debug-app debug-window">
        <h2>Debug</h2>
        <hr />
        <Row className="">
          <h4>Account operations</h4>
          <Col>
            <Button className="mb-1 p-1" variant="primary">
              Admin
            </Button>
          </Col>
          <Col>
            <Button className="mb-1 p-1" variant="primary">
              User
            </Button>
          </Col>
          <Col>
            <Button className="mb-1 p-1" variant="primary">
              Logout
            </Button>
          </Col>
        </Row>
        <Row className="">
          <h4>Page data</h4>
          <Col>
            <Button
              className="mb-1 p-1"
              variant="primary"
              onClick={() => console.log(getAppData)}
            >
              App
            </Button>
          </Col>
          <Col>
            <Button
              className="mb-1 p-1"
              variant="primary"
              onClick={() => {
                setLoading("asd")
              }}
            >
              setLoading
            </Button>
          </Col>
          <Col>
            <Button
              className="mb-1 p-1"
              variant="primary"
              onClick={() => setLoading("basd")}
            >
              setLoading2
            </Button>
          </Col>
          <Col>
            <Button
              className="mb-1 p-1"
              variant="primary"
              onClick={() => triggerError()}
            >
              Trigger Error
            </Button>
          </Col>
          <Col>
            <Button
              className="mb-1 p-1"
              variant="primary"
              onClick={() => toggleInterfaceTheme()}
            >
              ToggleTheme
            </Button>
          </Col>
        </Row>
        <Row className="">
          <Col>
          {getAppData.debugWindow}
          {getAppData.interfaceTheme}
          {getAppData.error.colno}
        </Col>
        </Row>
      </div>
      <div className="debug-com debug-window">
        <h4>Communication</h4>
      </div>
    </Col>
  );
}
