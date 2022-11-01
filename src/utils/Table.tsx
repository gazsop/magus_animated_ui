import React from "react";
import { Col, Row } from "react-bootstrap";

export type TGenerateTableInputField = Array<Array<React.ReactElement>>;
export type TGenerateTableParameters = {inputField: TGenerateTableInputField, classes: {col: string[], row: string[]}};

export const GenerateTable: (val: TGenerateTableParameters)=>React.ReactElement = ({inputField, classes}) => {
  const rowClasses: string = classes.row.toString().replaceAll(","," ")
  const colClasses: string = classes.col.toString().replaceAll(","," ")

  const table: JSX.Element[] = (inputField.map((rows: Array<any>, rowIndex: number)=>{
    return (<Row key={rowIndex} className={rowClasses}>
      {rows.map((cell: JSX.Element, cellIndex)=>{
        return (<Col key={cellIndex} className={colClasses}>
        {cell}
        </Col>)
      })}
    </Row>)
  }))
  return (<>{table}</>)
}