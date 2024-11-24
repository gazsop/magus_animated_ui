import { useEffect, useState } from "react";
import { Character } from "@appTypes/shared_types";
import { FlexCol, FlexRow } from "../components/Flex";
import useRequest from "../hooks/request";
import ImageIcon from "../components/icons/general/image.svg";
import EasyCut from "../components/EasyCut";
import FancyWindow from "../components/FancyWindow";

function AdventureCharacterSelection({
  selectCharacter,
}: {
  selectCharacter: (id: string) => void;
}) {
  const [adventureCharacters, setAdventureCharacters] = useState<
    {
      id: string;
      name: string;
      character: Character.TCharacter;
    }[]
  >([]);
  const [requestAdventure] = useRequest("adventures");

  useEffect(() => {
    requestAdventure({
      endPoint: "/getUserAllAdventureCharacters",
    }).then((response) => {
      setAdventureCharacters(response.data);
    });
  }, []);

  const CharactersElements = () => {
    const Elements: JSX.Element[] = [];
    adventureCharacters.forEach((adv) => {
      const currentData = {
        level: adv.character.level ? adv.character.level.current : 1,
        className: adv.character.class || "Nincs még",
        descent: adv.character.descent || "Nincs még",
      };
      Elements.push(
        <PlayerCard
          key={adv.id}
          id={adv.id}
          imgSrc=""
          name={adv.name}
          level={currentData.level}
          className={currentData.className}
          descent={currentData.descent}
          edited={"Lesz majd"}
          selectCharacter={selectCharacter}
        />
      );
    });
    return <>{Elements}</>;
  };
  return (
    <FlexCol className="grow h-full w-full p-1 fancy-container overflow-auto">
      <CharactersElements />
      <EasyCut />
      {/*<FancyWindow height={650} width={1950} />*/}
    </FlexCol>
  );
}

export function PlayerCard({
  id,
  imgSrc,
  name,
  level,
  className,
  descent,
  edited,
  selectCharacter,
}: {
  id: string;
  imgSrc?: string;
  name: string;
  level: number;
  className: string;
  descent: string;
  edited: string;
  selectCharacter: (char: string) => void;
}) {
  return (
    <div
      className="player-card p-4 select-none cursor-pointer my-1 fancy-container"
      onClick={() => selectCharacter(id)}
    >
      <FlexRow className="items-center">
        {/* Circular Image Container */}
        <div className="flex-shrink-0 w-16 h-16 border-2 border-black rounded-full overflow-hidden mr-4">
          <img
            src={imgSrc || ImageIcon}
            alt={`${name} portrait`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Text Container */}
        <FlexCol className="flex-grow wrap">
          <span className="font-bold">{name}</span>
          <span>{`Level: ${level}`}</span>
          <span>{`Class: ${className}`}</span>
          <span>{`descent: ${descent}`}</span>
        </FlexCol>
        <FlexCol>
          <span>{`Szerkesztve: ${edited}`}</span>
        </FlexCol>
      </FlexRow>
    </div>
  );
}

export default AdventureCharacterSelection;
