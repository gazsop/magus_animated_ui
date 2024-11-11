import { useEffect, useState } from "react";
import useRequest from "../../hooks/request";
import { SingleValue } from "react-select";
import {
  ButtonUnq,
  HTMLOptionData,
  InputUnq,
  SelectUnq,
} from "../../components/GeneralElements";
import { FlexCol, FlexRow } from "../../components/Flex";
import { Adventure, Character } from "@appTypes/shared_types";
import RndContainer from "../../components/RndContainer";
import { IWindowsLayerWindowProps, useWindowsLayer } from "../WindowsLayer";
import { getPropState } from "../../utils/common";
import CharacterPage from "../Character/Character";
import CharacterHandling from "./CharacterHandling";

const newAdv = {
  id: "0",
  json: {
    name: "New Adventure",
  },
};
const emptyAdv = {
  id: "-1",
  json: {
    name: "",
  },
};

function AdventureHandling() {
  const [adventures, _setAdventures] = useState<Adventure.IAdventureClient[]>([
    newAdv,
  ]);
  const [selectedAdventure, setSelectedAdventure] =
    useState<Adventure.IAdventureClient>(emptyAdv);
  const [display, setDisplay] = useState<boolean>(true);
  const [requestAdventure] = useRequest("adventures");
  const [requestUser] = useRequest("users");

  useEffect(() => {
    getAllAdventures();
  }, []);

  useEffect(() => {
    if (!selectedAdventure && adventures.length > 0)
      setSelectedAdventure(emptyAdv);
  }, [adventures]);

  function getAllAdventures() {
    requestAdventure({
      endPoint: "/getAll",
    })
      .then((response) => {
        if (response.data.length !== 0)
          _setAdventures([newAdv, ...response.data]);
      })
      .catch((error) => {
        console.error("Failed to fetch adventures: ", error);
      });
  }

  function setAdventures(adv: Adventure.IAdventureClient) {
    if (adv.id === "-1") return;
    if (adventures.find((adv) => adv.id === adv.id)) {
      _setAdventures((prev) =>
        prev.map((prevAdv) => {
          if (prevAdv.id === adv.id) {
            return adv;
          }
          return prevAdv;
        })
      );
      setSelectedAdventure(adv);
      return;
    }
    _setAdventures((prev) => [...prev, adv]);
    setSelectedAdventure(adv);
  }

  function getSelectValue() {
    if (getPropState("empty", selectedAdventure.id))
      return { label: "", value: "" };
    if (getPropState("new", selectedAdventure.id))
      return {
        label: selectedAdventure.json.name || "New Adventure",
        value: selectedAdventure.id || "0",
      };
    return { label: selectedAdventure.json.name, value: selectedAdventure.id };
  }

  const className = "";

  return (
    <FlexCol className={className}>
      <label onClick={() => setDisplay(!display)} className={`text-center`}>
        ADVENTURES
      </label>
      <SelectUnq
        id={"adventures-list"}
        label={"Select Adventure"}
        value={getSelectValue()}
        onChange={(e) => {
          if (!e) return;
          console.log(adventures);
          console.log(e);
          setSelectedAdventure(
            adventures.find((adv) => adv.id === e.value) || newAdv
          );
        }}
        optionData={[
          ...adventures.map((adventure, index) => {
            if (index === 0)
              return {
                label: "New Adventure",
                value: "0",
              };
            return {
              label: adventure.json.name,
              value: adventure.id,
            };
          }),
        ]}
        className="m-1"
        disabled={false}
      />
      {display && (
        <>
          <InputUnq
            id={`id-${selectedAdventure.id}`}
            label={"id"}
            value={
              getPropState("both", selectedAdventure.id)
                ? ""
                : selectedAdventure.id
            }
            className="m-1"
            disabled={true}
          />
          <InputUnq
            id={`name-${selectedAdventure.id}`}
            label={"Name"}
            value={
              getPropState("empty", selectedAdventure.id)
                ? ""
                : selectedAdventure.json.name
            }
            onBlur={(e) => {
              const elem = e.target as HTMLInputElement;
              const val = elem.value as string;
              setAdventures({
                id: selectedAdventure.id,
                json: {
                  name: val,
                },
              });
            }}
            className="m-1"
            disabled={selectedAdventure.id === "-1"}
          />
          <FlexRow>
            <ButtonUnq
              id={`get-all-${selectedAdventure.id}`}
              onClick={() => getAllAdventures()}
              className="m-1"
            >
              GET ALL
            </ButtonUnq>
            <ButtonUnq
              id={`update-${selectedAdventure.id}`}
              onClick={() => {
                const body: Adventure.IAdventureClient = {
                  id: selectedAdventure.id,
                  json: {
                    name: selectedAdventure.json.name,
                  },
                };
                requestAdventure({
                  endPoint: "/update",
                  body: body,
                }).then((res) => {
                  console.log(res);
                  setAdventures(body);
                });
              }}
              className="m-1"
              disabled={getPropState("empty", selectedAdventure.id)}
            >
              UPDATE
            </ButtonUnq>
            <ButtonUnq
              id={`delete-${selectedAdventure.id}`}
              onClick={() => {
                if (!confirm("Are you sure you want to delete this adventure?"))
                  return;
                requestAdventure({
                  endPoint: "/delete",
                  body: {
                    id: selectedAdventure.id,
                  },
                }).then((res) => {
                  console.log(res);
                  setSelectedAdventure(emptyAdv);
                  _setAdventures(
                    adventures.filter((adv) => adv.id !== selectedAdventure.id)
                  );
                });
              }}
              className="m-1"
              disabled={getPropState("empty", selectedAdventure.id)}
            >
              DELETE
            </ButtonUnq>
            <ButtonUnq
              id={`create-${selectedAdventure.id}`}
              onClick={() => {
                const body: Adventure.IAdventureClient = {
                  id: "",
                  json: {
                    name: selectedAdventure.json.name,
                  },
                };
                requestAdventure({
                  endPoint: "/create",
                  body: body,
                }).then((res) => {
                  setAdventures(body);
                  console.log(res);
                });
              }}
              className="m-1"
            >
              CREATE
            </ButtonUnq>
          </FlexRow>
          <FlexCol>
            <label htmlFor="" className={`text-center`}>
              Chars
            </label>
          </FlexCol>
          <CharacterHandling
            advId={selectedAdventure.id !== "-1" ? selectedAdventure.id : "0"}
          />
        </>
      )}
    </FlexCol>
  );
}

export default AdventureHandling;
