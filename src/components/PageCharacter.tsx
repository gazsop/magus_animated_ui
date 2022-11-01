import React from "react";
import { Col, InputGroup, Row } from "react-bootstrap";

export function Character(): React.ReactElement {
  const statFiller = (numberOfStatS: number) => {
    const template = (index: string)=> {
      return (
      <tr key={index}>
        <th style={{minWidth: "400px"}}>STAT_{index}</th>
        <td>
          <input type="number" defaultValue={index} readOnly={true} />
        </td>
      </tr>
    )};
    const container: Array<React.ReactElement> = [];
    for (let index = 0; index < numberOfStatS; index++) {
      container.push(template(index.toString()))
    }
    return container;
  };
  return (
    <div style={{width: "3000px"}}>
      <Row>
        <Col>
          <Row>
            <Col>
              <label htmlFor="">erő,ügyesség...</label>
              <table>
                <tbody>
                {statFiller(9)}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <Col>
            <label htmlFor="">hp,mana</label>
              <table>
                <tbody>
                {statFiller(6)}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <Col>
            <label htmlFor="">hp,mana regen/level</label>
              <table>
                <tbody>
                {statFiller(3)}
                </tbody>
              </table>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <label htmlFor="">RP</label>
              <table>
                {
                  statFiller(7)
                }
              </table>
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="">Szint</label>
              <table>
                {
                  statFiller(3)
                }
              </table>
            </Col>
          </Row>
          <Row>
            <Col>
            <label htmlFor="">HM</label>
              <table>
                {
                  statFiller(13)
                }
              </table>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <label htmlFor="">HM</label>
              <label htmlFor="">Stat</label>
              <table>
                {
                  statFiller(5)
                }
              </table>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
