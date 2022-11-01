import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useApp } from "../context/app.context";
import { GenerateTable, TGenerateTableInputField } from "../utils/Table";

export type TAdvantureGrid = {
  classes?: string[] | [];
  text?: string;
};

export function Advantures() {
  const { userGetAllAdvantures, selectAdvanture } = useApp();
  const numberOfAdvanturesInARow = 3;

  const tempSetAdvanture = ()=>{
    selectAdvanture("1");
    console.log("adv. set");
  }

  return (
    <Row>
      <Col>
        <div>
          <h2>PageAdvantures:</h2>
        </div>
      </Col>
    </Row>
  );
}
