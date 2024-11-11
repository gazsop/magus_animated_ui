import { useEffect, useRef, useState } from "preact/hooks";
import useRequest from "../../hooks/request";
import { IWindowsLayerWindowProps, useWindowsLayer } from "../WindowsLayer";
import RndContainer from "../../components/RndContainer";
import CharacterPage from "../Character/Character";
import { FlexCol } from "../../components/Flex";
import { ButtonUnq, SelectUnq } from "../../components/GeneralElements";
import { getPropState } from "../../utils/common";
import { Character } from "@appTypes/shared_types";

function CharacterHandling({ advId }: { advId: string }) {
  const { addWindow, removeWindow } = useWindowsLayer();
  const [characters, setCharacters] = useState<
    { name: string; uid: string; json: Character.TCharacter }[]
  >([]);

  const [selectedCharacter, setSelectedCharacter] = useState<number>(-1);
  const [requestCharacter] = useRequest("characters");
  console.log("characters", characters);
  console.log("selectedCharacter", selectedCharacter);

  const newChar: IWindowsLayerWindowProps = {
    jsx: ({ close, isOpen, selectWindow, classes }) => (
      <RndContainer
        id={`char_${advId}_${"admin1"}`}
        aditionalIcons={<>AI</>}
        close={() => {
          close();
          console.log("asd");
        }}
        label={`char_${advId}_${"admin1"}`}
      >
        <CharacterPage advId={advId}></CharacterPage>
      </RndContainer>
    ),
    name: "Character",
    icon: <>123</>,
  };

  useEffect(() => {
    if (!getPropState("both", advId)) {
      requestCharacter({
        endPoint: "/getAllUsersAndCharacters",
        body: {
          advId: advId,
        },
      }).then((response) => {
        console.log(response);
        if (response.data.length === 0) return;
        setCharacters(response.data);
        setSelectedCharacter(0);
      });
    }
    setSelectedCharacter(-1);
  }, [advId]);

  return (
    <>
      <FlexCol>
        <SelectUnq
          id={"charSelect"}
          label={"Characters"}
          optionData={
            characters.length > 0
              ? characters.map((char, index) => ({
                  label:
                    `${char.name} - ` +
                    (char.json.rp ? char.json.rp.name : "New"),
                  value: index.toString(),
                }))
              : []
          }
          value={
            selectedCharacter == -1
              ? {
                  label: "",
                  value: "",
                }
              : {
                  label:
                    `${characters[selectedCharacter].name} - ` +
                    (characters[selectedCharacter].json &&
                    characters[selectedCharacter].json.rp
                      ? characters[selectedCharacter].json.rp.name
                      : "New"),
                  value: characters[selectedCharacter].json.rp
                    ? characters[selectedCharacter].json.rp.name
                    : "New",
                }
          }
          onChange={(e) => {
            if (!e) return;
            const charIndex = parseInt(e.value);
            console.log("charIndex", charIndex);
            addWindow(newChar);
          }}
          className="m-1"
          disabled={getPropState("both", advId)}
        />
        <ButtonUnq
          id={"charSelect-add"}
          onClick={() => {
            addWindow(newChar);
          }}
        >
          TEST
        </ButtonUnq>
      </FlexCol>
    </>
  );
}

export default CharacterHandling;
