import { Adventure, Character } from "@appTypes/shared_types";
import { ButtonUnq, InputUnq, SelectUnq } from "./GeneralElements";
import { FlexCol, FlexRow } from "./Flex";
import { useRef, useState } from "preact/hooks";
import { RefObject } from "preact";

function RollItem(props: {
  id: string;
  addRoll: (roll: Adventure.TRollElements) => void;
  buttonText?: string;
  initialValues?: Adventure.TRollElements;
  hideButton?: boolean;
}) {
  const [rollState, setRollState] = useState<Adventure.TRollElements>({
    nrOfRolls: props.initialValues?.nrOfRolls || 1,
    nrOfDices: props.initialValues?.nrOfDices || 1,
    dice: props.initialValues?.dice || 6,
    constant: props.initialValues?.constant || 0,
  });
  return (
    <FlexRow>
      <InputUnq
        id={`${props.id}-nrOfRolls`}
        label="nrOfRolls"
        type="number"
        onChange={(e) => {
          setRollState({
            ...rollState,
            nrOfRolls: parseInt(e.currentTarget.value),
          });
        }}
        value={rollState.nrOfRolls}
        className={"w-auto"}
        widthOverride="w-10"
      />
      <InputUnq
        id={`${props.id}-nrOfDices`}
        label="nrOfDices"
        type="number"
        onChange={(e) => {
          setRollState({
            ...rollState,
            nrOfDices: parseInt(e.currentTarget.value),
          });
        }}
        value={rollState.nrOfDices}
        className={"w-auto"}
        widthOverride="w-10"
      />
      <SelectUnq
        id={`${props.id}-dice`}
        label="Dice"
        optionData={Object.values(Adventure.DICE)
          .filter((value) => typeof value === "number")
          .map((c) => {
            return {
              value: "k" + c.toString(),
              label: c.toString(),
            };
          })}
        onChange={(e) => {
          const target = e as HTMLOptionElement;
          const value = target.label;
          setRollState({
            ...rollState,
            dice: parseInt(value),
          });
        }}
        value={{
          label: rollState.dice.toString(),
          value: "k" + rollState.dice.toString(),
        }}
        widthOverride="w-20"
      ></SelectUnq>
      <InputUnq
        id={`${props.id}-constant`}
        label="Flat"
        type="number"
        onChange={(e) => {
          setRollState({
            ...rollState,
            constant: parseInt(e.currentTarget.value),
          });
        }}
        value={rollState.constant}
        widthOverride="w-10"
      />
      {!props.hideButton && (
        <ButtonUnq
          id={`${props.id}-addRoll`}
          onClick={() => {
            props.addRoll(rollState);
          }}
        >
          {props.buttonText || "Add"}
        </ButtonUnq>
      )}
    </FlexRow>
  );
}

export default RollItem;
