import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useApp } from "../core/App";

export function Debug() {
  const { toggleInterfaceTheme, getAppData, setLoading } =
    useApp();

  const triggerError = () => {
    console.log("error triggered by button");
    throw new Error("asd");
  };

  return (
    <div className="debug-container d-flex-inline">
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
              onClick={() => toggleInterfaceTheme()}
            >
              ToggleTheme
            </Button>
          </Col>
        </Row>
      </div>
      <div className="debug-com debug-window">
        <h4>Communication</h4>
      </div>
    </div>
  );
}
