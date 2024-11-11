import { useState } from "react";
import { FlexCol, FlexRow } from "../../components/Flex";
import { Character } from "@appTypes/shared_types";
import RndContainer from "../../components/RndContainer";

function Spells({
  close,
  isOpen,
  selectWindow,
  classes,
}: {
  close: () => void;
  isOpen: boolean;
  selectWindow: () => void;
  classes?: string;
}) {
  const [spells, _] = useState<Character.Spell.TSpellElements[]>();

  console.log(spells);

  const SpellsElement = () => (
    <FlexCol
      className={`bg-white p-1 grow relative nowrap overflow-x-hidden overflow-y-auto`}
      onClick={selectWindow}
    >
      {spells &&
        spells.map((spell) => {
          return (
            <div className="player-card border-2 border-black rounded-lg p-4 select-none cursor-pointer my-1">
              <FlexRow className="items-center">
                {/* Circular Image Container */}
                <div className="flex-shrink-0 w-16 h-16 border-2 border-black rounded-full overflow-hidden mr-4">
                  <img
                    src={spell.imgSrc || ""}
                    alt={`${spell.name} portrait`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Container */}
                <FlexCol className="flex-grow wrap">
                  <span className="font-bold">{`${spell.name}, LevelReq: ${spell.lvlReq}, Mana: 10`}</span>
                  <span>{`Description: ${spell.description}`}</span>
                </FlexCol>
                <FlexCol></FlexCol>
              </FlexRow>
            </div>
          );
        })}
    </FlexCol>
  );
  //return (
  //  <FlexCol
  //    className={`bg-white p-1 grow relative grow nowrap overflow-x-hidden overflow-y-auto`}
  //  >
  //    {spells &&
  //      spells.map((spell) => {
  //        return (
  //          <FlexRow
  //            key={spell.id}
  //            className="bg-white bg-opacity-100 p-1 shrink-0 justify-between items-center"
  //          >
  //            <FlexCol>
  //              <div className="grow">{spell.name}</div>
  //            </FlexCol>
  //            <div className={`grow`}>{spell.description}</div>
  //            <FlexRow />
  //          </FlexRow>
  //        );
  //      })}
  //  </FlexCol>
  //);

  if (!isOpen) return <></>;

  return (
    <RndContainer
      id="spells"
      aditionalIcons={null}
      close={close}
      label="Spells"
      className={classes}
    >
      <SpellsElement />
    </RndContainer>
  );
}

function Spell() {
  return (
    <FlexRow>
      <div className={`rounded-full w-24 h-24 bg-red-500`}></div>
    </FlexRow>
  );
}
export default Spells;
