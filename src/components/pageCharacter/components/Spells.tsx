import React from "react";
import { Col, InputGroup, Row } from "react-bootstrap";
import { ISpell } from "../../../core/Spells";
import { Id } from "../../../utils/getId";

export function Spells(props:{
  spellsData: ISpell[]
}): React.ReactElement {
  return (
  <>
    {props.spellsData.map(spell=>(<div>asd</div>))}
  </>);
}
