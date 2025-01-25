import { useEffect, useRef, useState } from "preact/hooks";
import { Adventure, Character } from "@appTypes/shared_types";
import useRequest from "../../hooks/request";
import { MultiValue, SingleValue } from "react-select";
import {
  ButtonUnq,
  CheckboxUnq,
  HTMLOptionData,
  InputUnq,
  SelectUnq,
  TextAreaUnq,
} from "../../components/GeneralElements";
import { FlexCol, FlexRow } from "../../components/Flex";
import RndContainer from "../../components/RndContainer";
import RollItem from "../../components/Roll";
import { useWindowsLayer } from "../WindowsLayer";
import { useMemo } from "react";
import SaveIcon from "../../components/icons/general/SaveIcon";

function DescentHandling() {
  const [descentList, setDescentList] = useState<Character.TDescent[]>();

  const initialized = useRef(false);
  const windowsLayer = useWindowsLayer();

  const [requestCharacter] = useRequest("characters");

  useEffect(() => {
    getAllDescents();
  }, []);

  const getAllDescents = () => {
    requestCharacter<Character.TDescent[]>({
      endPoint: "/getAllDescents",
    })
      .then((response) => {
        setDescentList([...response.data]);
      })
      .catch((error) => {
        console.error("Failed to fetch descents: ", error);
      });
  };

  const getSelectedDescent = (
    selectedDescent: SingleValue<HTMLOptionData<string>>
  ) => {
    return requestCharacter<Character.TDescent>({
      endPoint: `/getDescent`,
      body: { descentId: selectedDescent?.value },
    });
  };

  const DescentHandlingWindow = ({
    close,
    isOpen,
    selectWindow,
    selectedDescentProp,
  }: {
    close: () => void;
    isOpen: boolean;
    selectWindow: () => void;
    selectedDescentProp: Character.TDescent;
  }) => {
    if (!initialized.current) {
      initialized.current = true;
    }

    const [selectedDescent, setSelectedDescent] =
      useState<Character.TDescent>(selectedDescentProp);
    const [classList, setClassList] =
      useState<{ id: string; name: Character.CLASSES }[]>();

    useEffect(() => {
      requestCharacter<{ id: string; name: Character.CLASSES }[]>({
        endPoint: "getAllClasses",
      })
        .then((response) => {
          console.log(response);
          const newClass = {
            id: "0",
            name: "Select a class" as Character.CLASSES,
          };
          setClassList([newClass, ...response.data]);
        })
        .catch((error) => {
          console.error("Failed to fetch classes: ", error);
        });
    }, []);

    const SecondaryStatInitialsElement = () => {
      const [selectedStat, setSelectedStat] =
        useState<Character.TSecondaryStat>({
          id: "0",
          name: "" as Character.SECONDARY_STATS,
          skillLevel: Character.SECONDARY_STAT_LEVEL.BASIC,
          skill: 0,
          lvlReq: 0,
        });

      return (
        <FlexCol>
          <FlexCol>
            <label className={`grow`}>Secondary Stat initial</label>
            <SelectUnq
              id={`secondaryStat-name-${selectedStat.id}`}
              label="name"
              optionData={Object.keys(Character.SECONDARY_STATS).map(
                (c, index) => ({
                  value: c,
                  label:
                    Character.SECONDARY_STATS[
                      c as keyof typeof Character.SECONDARY_STATS
                    ],
                })
              )}
              onChange={(e) => {
                const val = e as SingleValue<
                  HTMLOptionData<keyof typeof Character.SECONDARY_STATS>
                >;
                setSelectedStat((prev) => {
                  const newStat = { ...prev };
                  if (!val) return newStat;
                  newStat.name = Character.SECONDARY_STATS[val.value];
                  return newStat;
                });
              }}
              value={{
                label: selectedStat.name,
                value: selectedStat.name,
              }}
              widthOverride="w-60"
            />
            <InputUnq
              id={`secondaryStat-lvlReq-${selectedStat.id}`}
              label="lvlReq"
              value={selectedStat.lvlReq}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                console.log(value);

                setSelectedStat((prev) => {
                  const newStat = { ...prev };
                  newStat.lvlReq = parseInt(value);
                  return newStat;
                });
              }}
              type="number"
            />
            <SelectUnq
              id={`secondaryStat-skillLevel-${selectedStat.id}`}
              label="skillLevel"
              optionData={Object.values(Character.SECONDARY_STAT_LEVEL).map(
                (e) => ({ value: e, label: e })
              )}
              onChange={(e) => {
                const val = e as SingleValue<HTMLOptionData<string>>;
                setSelectedStat((prev) => {
                  const newStat = { ...prev };
                  if (!val) return newStat;
                  newStat.skillLevel =
                    val.value as Character.SECONDARY_STAT_LEVEL;
                  return newStat;
                });
              }}
              value={{
                label: selectedStat.skillLevel,
                value: selectedStat.skillLevel,
              }}
            />
            <InputUnq
              id={`secondaryStat-skill-${selectedStat.id}`}
              label="skill"
              value={selectedStat.skill}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                console.log(value);

                setSelectedStat((prev) => {
                  const newStat = { ...prev };
                  newStat.skill = parseInt(value);
                  return newStat;
                });
              }}
              type="number"
            />
            <ButtonUnq
              id={`secondaryStat-add-${selectedStat.id}`}
              onClick={(e) => {
                console.log(selectedStat);
                setSelectedDescent((prev) => {
                  const newDescent = { ...prev };
                  newDescent.modifiers.secondaryStatScalings.push(selectedStat);
                  return newDescent;
                });
              }}
            >
              Add
            </ButtonUnq>
          </FlexCol>
          <FlexCol>
            {selectedDescent.modifiers.secondaryStatScalings.map((e) => (
              <FlexRow>
                <label className={`grow`}>{e.name}</label>
                <InputUnq
                  id={`secondaryStat-lvlReq-${e.id}`}
                  label="lvlReq"
                  value={e.lvlReq}
                  disabled={true}
                />
                <InputUnq
                  id={`secondaryStat-skillLevel-${e.id}`}
                  label="skillLevel"
                  value={e.skillLevel}
                  disabled={true}
                />
                <InputUnq
                  id={`secondaryStat-skill-${e.id}`}
                  label="skill"
                  value={e.skill}
                  disabled={true}
                />
                <ButtonUnq
                  id={`secondaryStat-remove-${e.id}`}
                  onClick={() => {
                    setSelectedDescent((prev) => {
                      const newDescent = { ...prev };
                      newDescent.modifiers.secondaryStatScalings =
                        newDescent.modifiers.secondaryStatScalings.filter(
                          (s) => s !== e
                        );
                      return newDescent;
                    });
                  }}
                >
                  X
                </ButtonUnq>
              </FlexRow>
            ))}
          </FlexCol>
        </FlexCol>
      );
    };

    const AllowedClassesElement = () => {
      const [selectedClassId, setSelectedClassId] = useState<string>("0");
      const selectedPermissionRef = useRef<boolean>(false);
      return (
        <FlexCol>
          <FlexRow>
            <CheckboxUnq
              id={`DescentHandling-${selectedDescent.id}-permission`}
              label="Permission"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const val = target.checked;
                if (!val) return;
                selectedPermissionRef.current = val;
              }}
              value={selectedPermissionRef.current}
            />
            <SelectUnq<String, SingleValue<HTMLOptionData<string>>>
              id={`DescentHandling-${selectedDescent.id}-classes`}
              label="Classes"
              optionData={
                classList
                  ? classList.map((c) => ({ value: c.id, label: c.name }))
                  : []
              }
              value={
                selectedClassId
                  ? {
                      label:
                        classList?.find((cl) => cl.id === selectedClassId)
                          ?.name || "",
                      value: selectedClassId,
                    }
                  : { label: "Select", value: "0" }
              }
              onChange={(e) => {
                const val = e;
                if (!val) return;
                setSelectedClassId(val.value);
              }}
            />
            <ButtonUnq
              id={`DescentHandling-${selectedDescent.id}-addAllowedClass`}
              onClick={() => {
                setSelectedDescent((prev) => {
                  const newDescent = { ...prev };
                  if (!newDescent.allowedClasses)
                    newDescent.allowedClasses = [];
                  newDescent.allowedClasses.push({
                    id: selectedClassId,
                    permission: selectedPermissionRef.current,
                  });
                  return newDescent;
                });
              }}
            >
              Add
            </ButtonUnq>
          </FlexRow>
          {selectedDescent.allowedClasses?.map((c) => (
            <FlexRow>
              <label>
                {classList?.find((cl) => cl.id === c.id)?.name || ""}
              </label>
              <CheckboxUnq
                id={`DescentHandling-${selectedDescent.id}-permission`}
                label="Permission"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const val = target.checked;
                  setSelectedDescent((prev) => {
                    const newDescent = { ...prev };
                    newDescent.allowedClasses = newDescent.allowedClasses?.map(
                      (cl) => {
                        if (cl.id === c.id) {
                          cl.permission = val;
                        }
                        return cl;
                      }
                    );
                    return newDescent;
                  });
                }}
                value={c.permission}
              />
              <ButtonUnq
                id={`DescentHandling-${selectedDescent.id}-removeAllowedClass`}
                onClick={() => {
                  setSelectedDescent((prev) => {
                    const newDescent = { ...prev };
                    newDescent.allowedClasses =
                      newDescent.allowedClasses?.filter((cl) => cl.id !== c.id);
                    return newDescent;
                  });
                }}
              >
                X
              </ButtonUnq>
            </FlexRow>
          ))}
        </FlexCol>
      );
    };

    return (
      <RndContainer
        id={`DescentHandling-${selectedDescent.id}`}
        aditionalIcons={
          <SaveIcon
            onClick={() => {
              console.log(selectedDescent);
              requestCharacter<{ descent: Character.TDescent }>({
                endPoint: "/updateDescent",
                body: { descent: selectedDescent },
              }).then((r) => console.log(r));
            }}
            className="h-4 m-1 w-6 cursor-pointer"
          />
        }
        close={() => {
          close();
          console.log("ClassHandlingWindow close");
        }}
        label={`char_${selectedDescent.id || ""}`}
      >
        <FlexCol className="grow w-full">
          <InputUnq
            id={`DescentHandling-${selectedDescent.id}-name`}
            label="Name"
            value={selectedDescent.name || ""}
            disabled={true}
          />
          <AllowedClassesElement />
          <hr />
          <FlexCol className="">
            <label>HM</label>
            <InputUnq
              id={`DescentHandling-${selectedDescent.id}-hm-atk`}
              label={Character.HM.ATK}
              value={selectedDescent.modifiers.hm.ATK || 0}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = Number(target.value);

                if (isNaN(value)) return;
                if (!selectedDescent) return;

                setSelectedDescent((prev) => {
                  const newDescent = { ...prev };
                  newDescent.modifiers.hm.ATK = value;
                  return newDescent;
                });
              }}
              type="number"
            />
            <InputUnq
              id={`DescentHandling-${selectedDescent.id}-hm-def`}
              label={Character.HM.DEF}
              value={selectedDescent.modifiers.hm.DEF || 0}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = Number(target.value);

                if (isNaN(value)) return;
                if (!selectedDescent) return;

                setSelectedDescent((prev) => {
                  const newDescent = { ...prev };
                  newDescent.modifiers.hm.DEF = value;
                  return newDescent;
                });
              }}
              type="number"
            />
            <InputUnq
              id={`DescentHandling-${selectedDescent.id}-hm-ini`}
              label={Character.HM.INI}
              value={selectedDescent.modifiers.hm.INI || 0}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = Number(target.value);

                if (isNaN(value)) return;
                if (!selectedDescent) return;

                setSelectedDescent((prev) => {
                  const newDescent = { ...prev };
                  newDescent.modifiers.hm.INI = value;
                  return newDescent;
                });
              }}
              type="number"
            />
            <InputUnq
              id={`DescentHandling-${selectedDescent.id}-hm-aim`}
              label={Character.HM.AIM}
              value={selectedDescent.modifiers.hm.AIM || 0}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = Number(target.value);

                if (isNaN(value)) return;
                if (!selectedDescent) return;

                setSelectedDescent((prev) => {
                  const newDescent = { ...prev };
                  newDescent.modifiers.hm.AIM = value;
                  return newDescent;
                });
              }}
              type="number"
            />
          </FlexCol>
          <hr />
          {
            //TODO: this part is a shitshow, rewrite it
            Object.values(Character.PRIMARY_STATS).map((stat, index) => (
              <FlexRow>
                <InputUnq
                  id={`DescentHandling-${selectedDescent.id}-primaryStats-${index}`}
                  label={stat}
                  value={
                    selectedDescent.modifiers.primaryStats.find(
                      (s) => s.name === stat
                    )?.val || 0
                  }
                  type="number"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const value = Number(target.value);

                    if (isNaN(value)) return;
                    if (!selectedDescent) return;

                    setSelectedDescent((prev) => {
                      const newDescent = { ...prev };
                      const statIndex =
                        newDescent.modifiers.primaryStats.findIndex(
                          (s) => s.name === stat
                        );
                      if (statIndex === -1) {
                        newDescent.modifiers.primaryStats.push({
                          name: stat,
                          val: value,
                        });
                      } else {
                        newDescent.modifiers.primaryStats[statIndex].val =
                          value;
                      }
                      return newDescent;
                    });
                  }}
                  className={"justify-between grow"}
                />
              </FlexRow>
            ))
          }
          <hr />
          <SecondaryStatInitialsElement />
          <TextAreaUnq
            id={`DescentHandling-${selectedDescent.id}-description`}
            label="Description"
            value={selectedDescent.description}
            onSave={(msg) => {
              setSelectedDescent((prev) => {
                const newDescent = { ...prev };
                newDescent.description = msg;
                return newDescent;
              });
            }}
            element="editor"
          />
        </FlexCol>
      </RndContainer>
    );
  };

  return (
    <>
      <FlexCol className={``} preventShrink={true}>
        <SelectUnq
          id={"DescentHandling-list"}
          label="Descents"
          optionData={
            descentList
              ? descentList.map((c) => ({ value: c.id, label: c.name }))
              : []
          }
          onChange={(e) => {
            console.log(e);
            if (typeof e !== "undefined") {
              getSelectedDescent(e)?.then((r) => {
                windowsLayer.addWindow({
                  name: "DescentHandling",
                  icon: <>DH</>,
                  jsx: ({ close, isOpen, selectWindow }) => {
                    return (
                      <DescentHandlingWindow
                        close={close}
                        isOpen={isOpen}
                        selectWindow={selectWindow}
                        selectedDescentProp={r.data}
                      />
                    );
                  },
                });
              });
            }
          }}
          value={{
            label: "Select a descent",
            value: "0" as Character.DESCENTS,
          }}
        ></SelectUnq>
        <ButtonUnq
          id={"DescentHandling-getAllDescents"}
          onClick={(e) => getAllDescents()}
        >
          TEST
        </ButtonUnq>
      </FlexCol>
    </>
  );
}

export default DescentHandling;
