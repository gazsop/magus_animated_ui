import { memo, useEffect, useRef, useState } from "preact/compat";
import { FlexCol, FlexRow } from "../../components/Flex";
import { Adventure, Character } from "@appTypes/shared_types";
import useRequest from "../../hooks/request";
import {
  ButtonUnq,
  CheckboxUnq,
  HTMLOptionData,
  InputUnq,
  SelectUnq,
  TextAreaUnq,
} from "../../components/GeneralElements";
import { SingleValue } from "react-select";
import DescentHandling from "./CharacterDescentHandling";
import { useWindowsLayer } from "../WindowsLayer";
import RndContainer from "../../components/RndContainer";
import RollItem from "../../components/Roll";
import { SecondaryStatLevelsElement } from "./CharacterSecondaryStatHandling";
import SaveIcon from "../../components/icons/general/SaveIcon";
import EditIcon from "../../components/icons/general/EditIcon";
import { ComponentChildren } from "preact";
import { MutableRef } from "preact/hooks";

function ClassHandling() {
  const [classList, setClassList] = useState<Character.TClass[]>();
  const windowsLayer = useWindowsLayer();

  const [requestClass] = useRequest("characters");

  useEffect(() => {
    getAllClasses();
  }, []);

  console.log("char", classList);
  const getAllClasses = () => {
    requestClass<Character.TClass[]>({
      endPoint: "/getAllClasses",
    })
      .then((response) => {
        console.log(response);
        setClassList(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch classes: ", error);
      });
  };

  const getSelectedClass = (
    selectedClass: SingleValue<HTMLOptionData<string>>
  ) => {
    return requestClass<Character.TClass>({
      endPoint: `/getClass`,
      body: { classId: selectedClass?.value },
    });
  };

  const ClassHandlingWindow = ({
    close,
    isOpen,
    selectWindow,
    selectedClassProps,
  }: {
    close: () => void;
    isOpen: boolean;
    selectWindow: () => void;
    selectedClassProps: Character.TClass;
  }) => {
    const isEditedRef = useRef(false);
    const [selectedClass, setSelectedClass] = useState<Character.TClass>({
      ...selectedClassProps,
      modifiers: {
        ...selectedClassProps.modifiers,
        primaryStats: [...selectedClassProps.modifiers.primaryStats],
      },
      specs: selectedClassProps.specs ? [...selectedClassProps.specs] : [],
      spells: selectedClassProps.spells ? [...selectedClassProps.spells] : [],
    });
    const spellsRef = useRef<{
      [key in string]:
        | Character.Spell.TSpellElements
        | Character.Spell.ISpellLevel;
    }>({});
    const secondaryStatRefs = useRef<Character.TSecondaryStat[]>([]);
    const [showSecondaryStats, setshowSecondaryStats] = useState(false);

    useEffect(() => {
      if (!isEditedRef.current) {
        isEditedRef.current = true;
      }
      console.log("selectedClass", selectedClass);
    }, [selectedClass]);

    const saveClass = () => {
      const reconstructedSpells = Object.keys(spellsRef.current)
        .map((s) => {
          if (spellsRef.current[s].parentId !== "0") {
            return null;
          }
          const levels = Object.keys(spellsRef.current)
            .map((l) => {
              if (
                !("parentId" in spellsRef.current[l]) ||
                !spellsRef.current[l].parentId ||
                spellsRef.current[l].parentId !== s
              ) {
                return null;
              }
              return spellsRef.current[l] as Character.Spell.ISpellLevel;
            })
            .filter(Boolean) as Character.Spell.ISpellLevel[];
          const spell = spellsRef.current[s] as Character.Spell.TSpellElements;
          return {
            ...spell,
            levels,
          };
        })
        .filter(Boolean) as Character.Spell.TSpellElements[];

      const newSelectedClass: Character.TClass = {
        ...selectedClass,
        spells: reconstructedSpells,
        modifiers: {
          ...selectedClass.modifiers,
          secondaryStats: secondaryStatRefs.current,
        },
      };
      requestClass({
        endPoint: "/updateClass",
        body: { class: newSelectedClass },
      }).then((response) => {
        console.log(response);
      });
    };

    const SecondaryStatScalings = () => {
      const [selectedStatScaling, setSelectedStatScaling] =
        useState<Character.TSecondaryStat>({
          id: "0",
          name: "Select a stat" as Character.SECONDARY_STATS,
          skill: 0,
          skillLevel: Character.SECONDARY_STAT_LEVEL.BASIC,
          lvlReq: 0,
        });
      return (
        <>
          <FlexRow>
            <label className="grow">SecondaryStatScaling</label>
            <SelectUnq
              id={`char-select-stat-${selectedStatScaling.id}`}
              label=""
              optionData={Object.values(Character.SECONDARY_STATS).map((c) => ({
                value: c,
                label: c,
              }))}
              onChange={(e) => {
                setSelectedStatScaling((prev) => {
                  return {
                    ...prev,
                    name:
                      (e?.value as Character.SECONDARY_STATS) ||
                      ("0" as Character.SECONDARY_STATS),
                  };
                });
              }}
              value={{
                label: selectedStatScaling.name as string,
                value: selectedStatScaling.id,
              }}
              widthOverride="w-32"
            ></SelectUnq>
            <SelectUnq
              id={`char-select-level-${selectedStatScaling.id}`}
              label="level"
              optionData={Object.values(Character.SECONDARY_STAT_LEVEL).map(
                (c) => ({
                  value: c,
                  label: c,
                })
              )}
              onChange={(e) => {
                setSelectedStatScaling((prev) => {
                  return {
                    ...prev,
                    skillLevel:
                      e?.value || Character.SECONDARY_STAT_LEVEL.BASIC,
                  };
                });
              }}
              value={{
                label: selectedStatScaling.skillLevel as string,
                value: selectedStatScaling.skillLevel,
              }}
              widthOverride="w-32"
            />
            <InputUnq
              id={`char-input-skill-${selectedStatScaling.id}`}
              label="skill"
              value={selectedStatScaling.skill}
              onBlur={(e) => {
                setSelectedStatScaling((prev) => {
                  return {
                    ...prev,
                    skill: parseInt(e.currentTarget.value),
                  };
                });
              }}
              widthOverride="w-10"
            />
            <InputUnq
              id={`char-input-lvlReq-${selectedStatScaling.id}`}
              label="lvlReq"
              value={selectedStatScaling.lvlReq}
              onBlur={(e) => {
                setSelectedStatScaling((prev) => {
                  return {
                    ...prev,
                    lvlReq: parseInt(e.currentTarget.value),
                  };
                });
              }}
              widthOverride="w-10"
            />
            <ButtonUnq
              id={`char-add-stat-${selectedStatScaling.id}`}
              onClick={(e) => {
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      secondaryStatScalings: [
                        ...prev.modifiers.secondaryStatScalings,
                        selectedStatScaling,
                      ],
                    },
                  };
                });
              }}
            >
              Add
            </ButtonUnq>
          </FlexRow>
          <FlexCol className="grow">
            <label></label>
            {selectedClass.modifiers.secondaryStatScalings.map((stat) => (
              <FlexRow>
                <label className={`grow`}>{stat.name}</label>
                <InputUnq
                  id={`secondaryStat-lvlReq-${stat.id}`}
                  label="lvlReq"
                  value={stat.lvlReq}
                  disabled={true}
                />
                <InputUnq
                  id={`secondaryStat-skillLevel-${stat.id}`}
                  label="skillLevel"
                  value={stat.skillLevel}
                  disabled={true}
                />
                <InputUnq
                  id={`secondaryStat-skill-${stat.id}`}
                  label="skill"
                  value={stat.skill}
                  disabled={true}
                />
                <ButtonUnq
                  id={`secondaryStat-remove-${stat.id}`}
                  onClick={() => {
                    setSelectedClass((prev) => {
                      return {
                        ...prev,
                        modifiers: {
                          ...prev.modifiers,
                          secondaryStatScalings:
                            prev.modifiers.secondaryStatScalings.filter(
                              (s) => s.id !== stat.id
                            ),
                        },
                      };
                    });
                  }}
                >
                  X
                </ButtonUnq>
              </FlexRow>
            ))}
          </FlexCol>
        </>
      );
    };

    const Specs = () => {
      const [selectedSpec, setSelectedSpec] = useState<{
        name: string;
        description: string;
      }>({
        name: "",
        description: "",
      });
      console.log(selectedClass.specs);
      return (
        <FlexCol>
          <label>Specs</label>
          <FlexRow>
            <InputUnq
              id={`char-input-spec-name-${selectedSpec}`}
              label="Name"
              value={selectedSpec?.name || ""}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setSelectedSpec((prev) => {
                  return {
                    ...prev,
                    name: value,
                  };
                });
              }}
              layout="flex-col"
            />
            <TextAreaUnq
              id={`char-input-spec-descr-${selectedSpec}`}
              label="description"
              value={selectedSpec?.description || ""}
              onSave={(e) => {
                const msg = e;
                if (msg === selectedSpec?.description) return;
                setSelectedSpec((prev) => {
                  return {
                    ...prev,
                    description: msg,
                  };
                });
              }}
              layout="flex-col"
              element="editor"
              className="grow"
            />
            <ButtonUnq
              id="char-add-spec"
              onClick={(e) => {
                setSelectedClass((prev) => {
                  const prevSpecs = prev.specs || [];
                  return {
                    ...prev,
                    specs: [...prevSpecs, selectedSpec],
                  };
                });
              }}
            >
              Add
            </ButtonUnq>
          </FlexRow>
          <FlexCol className="grow">
            {selectedClass.specs.map((spec) => (
              <FlexRow>
                <InputUnq
                  id={`char-input-spec-${spec}`}
                  label="Name"
                  value={spec.name}
                  disabled={false}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    setSelectedClass((prev) => {
                      return {
                        ...prev,
                        specs: prev.specs.map((s) => {
                          if (s === spec) {
                            return {
                              ...s,
                              name: value,
                            };
                          }
                          return s;
                        }),
                      };
                    });
                  }}
                  layout="flex-col"
                />
                <TextAreaUnq
                  id={`char-input-spec-descr-${spec}`}
                  label="Description"
                  value={spec.description || ""}
                  disabled={false}
                  onSave={(e) => {
                    const msg = e;
                    if (msg === spec.description) return;
                    setSelectedClass((prev) => {
                      return {
                        ...prev,
                        specs: prev.specs.map((s) => {
                          if (s === spec) {
                            return {
                              ...s,
                              description: msg,
                            };
                          }
                          return s;
                        }),
                      };
                    });
                  }}
                  layout="flex-col"
                  element="editor"
                  className="grow"
                />
                <ButtonUnq
                  id={`char-remove-spec-${spec}`}
                  onClick={(e) => {
                    setSelectedClass((prev) => {
                      return {
                        ...prev,
                        specs: prev.specs.filter((s) => s !== spec),
                      };
                    });
                  }}
                >
                  Remove
                </ButtonUnq>
              </FlexRow>
            ))}
          </FlexCol>
        </FlexCol>
      );
    };

    const Spells = () => {
      const [parentId, setParentId] = useState<string>("0");

      const [selectedSpell, setSelectedSpell] = useState<
        Character.Spell.TSpellElements & {
          descriptionOpen: boolean;
          levels?: Character.Spell.ISpellLevel[];
        }
      >({
        id: "0",
        name: "",
        lvlReq: 0,
        description: "",
        spec: "",
        levels: [],
        resourceCost: 0,
        passive: false,
        type: "damage",
        nrOfTurns: 1,
        nrOfTurnsToCast: 1,
        descriptionOpen: false,
        range: 0,
        class: "" as Character.Spell.SPELL_CLASSES,
        parentId: "0",
      });

      const isMouseDownRef = useRef(false);

      useEffect(() => {
        const spellsElement = document.getElementById("spells");
        const onMouseDown = (e: MouseEvent) => {
          isMouseDownRef.current = true;
        };
        const onMouseUp = (e: MouseEvent) => {
          isMouseDownRef.current = false;
        };
        spellsElement?.addEventListener("mousedown", onMouseDown);
        spellsElement?.addEventListener("mouseup", onMouseUp);

        return () => {
          spellsElement?.removeEventListener("mousedown", onMouseDown);
          spellsElement?.removeEventListener("mouseup", onMouseUp);
        };
      }, []);

      const NewSpell = () => {
        return (
          <FlexCol className="grow mb-2">
            <FlexRow>
              <SelectUnq
                id={`char-select-spell-${parentId}`}
                label="parentId"
                optionData={[
                  {
                    value: "0",
                    label: "New Spell",
                  },
                  ...selectedClass.spells.map((c) => ({
                    value: c.id,
                    label: c.name,
                  })),
                ]}
                onChange={(e) => {
                  const val = e?.value || "0";
                  const spell = selectedClass.spells.find((s) => s.id === val);
                  if (!spell) return;
                  setSelectedSpell({
                    ...spell,
                    levels: spell.levels || [],
                    descriptionOpen: false,
                  });
                  setParentId(val);
                }}
                value={{
                  label:
                    selectedClass.spells.find((s) => s.id === parentId)?.name ||
                    "New Spell",
                  value: parentId,
                }}
                layout="flex-col"
                widthOverride="w-32"
              />
              <InputUnq
                id={`char-input-spell-${selectedSpell.id}`}
                label="name"
                value={selectedSpell.name}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  const value = target.value;
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      name: value,
                    };
                  });
                }}
                layout="flex-col"
                widthOverride="w-32"
              />
              <SelectUnq
                id={`char-select-spec-${selectedSpell.id}`}
                label="spec"
                optionData={[
                  {
                    value: "common",
                    label: "common",
                  },
                  ...(selectedClass.specs
                    ? selectedClass.specs.map(
                        (c) =>
                          ({
                            value: c.name,
                            label: c.name,
                          } as HTMLOptionData<string>)
                      )
                    : []),
                ]}
                onChange={(e) => {
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      spec: e?.value || "0",
                    };
                  });
                }}
                value={{
                  label: selectedSpell.spec,
                  value: selectedSpell.spec,
                }}
                layout="flex-col"
                widthOverride="w-32"
                disabled={parentId !== "0" ? true : false}
              />
              <SelectUnq
                id={`char-select-type-${selectedSpell.id}`}
                label="Type"
                optionData={[
                  {
                    value: "damage",
                    label: "damage",
                  },
                  {
                    value: "heal",
                    label: "heal",
                  },
                  {
                    value: "utility",
                    label: "utility",
                  },
                ]}
                onChange={(e) => {
                  const val = e?.value as Character.Spell.TSpellType;
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      type: val || ("damage" as Character.Spell.TSpellType),
                    };
                  });
                }}
                value={{
                  label: selectedSpell.type,
                  value: selectedSpell.type,
                }}
                layout="flex-col"
                widthOverride="w-32"
                disabled={parentId !== "0" ? true : false}
              />
              <InputUnq
                id={`char-input-lvlReq-${selectedSpell.id}`}
                label="lvlReq"
                value={selectedSpell.lvlReq}
                onInput={(e) => {
                  if (!isMouseDownRef.current) return;
                  console.log(e);
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      lvlReq: value,
                    };
                  });
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      lvlReq: value,
                    };
                  });
                }}
                type="number"
                layout="flex-col"
                widthOverride="w-20"
              />
              <InputUnq
                id={`char-input-resourceCost-${selectedSpell.id}`}
                label="resourceCost"
                value={selectedSpell.resourceCost}
                onInput={(e) => {
                  if (!isMouseDownRef.current) return;
                  console.log(e);
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      resourceCost: value,
                    };
                  });
                }}
                onBlur={(e) => {
                  console.log(e);
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      resourceCost: value,
                    };
                  });
                }}
                layout="flex-col"
                widthOverride="w-20"
              />
              <InputUnq
                id={`char-input-nrOfTurns-${selectedSpell.id}`}
                label="nrOfTurns"
                value={selectedSpell.nrOfTurns}
                onInput={(e) => {
                  if (!isMouseDownRef.current) return;
                  console.log(e);
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      nrOfTurns: value,
                    };
                  });
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      nrOfTurns: value,
                    };
                  });
                }}
                type="number"
                layout="flex-col"
                widthOverride="w-20"
              />
              <InputUnq
                id={`char-input-nrOfTurnsToCast-${selectedSpell.id}`}
                label="nrOfTurnsToCast"
                value={selectedSpell.nrOfTurnsToCast}
                onInput={(e) => {
                  if (!isMouseDownRef.current) return;
                  console.log(e);
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      nrOfTurnsToCast: value,
                    };
                  });
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      nrOfTurnsToCast: value,
                    };
                  });
                }}
                type="number"
                layout="flex-col"
                widthOverride="w-20"
              />
              <InputUnq
                id={`char-input-range-${selectedSpell.id}`}
                label="range"
                value={selectedSpell.range || 0}
                onInput={(e) => {
                  if (!isMouseDownRef.current) return;
                  console.log(e);
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      range: value,
                    };
                  });
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      range: value,
                    };
                  });
                }}
                type="number"
                layout="flex-col"
                widthOverride="w-20"
              />
              <SelectUnq
                label="SpellClass"
                id={`char-select-class-${selectedSpell.id}`}
                optionData={[
                  ...Object.keys(Character.Spell.SPELL_CLASSES).map((c) => ({
                    value: c,
                    label: c,
                  })),
                ]}
                onChange={(e) => {
                  const val = e?.value as Character.Spell.SPELL_CLASSES;
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      class: val,
                    };
                  });
                }}
                value={{
                  label: selectedSpell.class,
                  value: selectedSpell.class,
                }}
                layout="flex-col"
                widthOverride="w-32"
              />
              <CheckboxUnq
                id={`char-input-passive-${selectedSpell.id}`}
                label="passive"
                value={selectedSpell.passive}
                onChange={(e) => {
                  console.log(e);
                  const target = e.target as HTMLInputElement;
                  console.log(target);
                  const val = target.checked;
                  console.log(val);
                  if (!val) return;
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      passive: val,
                    };
                  });
                }}
                layout="flex-col"
                widthOverride="w-20"
                disabled={parentId !== "0" ? true : false}
              />
              <TextAreaUnq
                id={`spell-list-description-${selectedSpell.id}`}
                label="description"
                value={selectedSpell.description || ""}
                onSave={(e) => {
                  console.log(e);
                  const msg = e;
                  console.log("msg", msg);
                  console.log(
                    "selectedSpell.description",
                    selectedSpell.description
                  );
                  if (msg === selectedSpell.description) return;
                  setSelectedSpell((prev) => {
                    return {
                      ...prev,
                      description: msg,
                    };
                  });
                }}
                layout="flex-col"
                element="editor"
                className="grow"
              />
              <ButtonUnq
                id="char-add-spell"
                onClick={(e) => {
                  const prevSpells = selectedClass.spells || [];
                  if (parentId === "0") {
                    setSelectedClass((prev) => {
                      return {
                        ...prev,
                        spells: [
                          ...prevSpells,
                          {
                            ...selectedSpell,
                            id: Date.now().toString(),
                          },
                        ],
                      };
                    });
                  } else {
                    const index = prevSpells.findIndex(
                      (s) => s.id === parentId
                    );
                    if (index === -1) return;
                    const newSpells = [...prevSpells];
                    const newSelectedSpell = {
                      ...selectedSpell,
                      levels: undefined,
                      parentId: parentId,
                    } as Character.Spell.ISpellLevel;

                    newSelectedSpell.rank =
                      newSpells[index].levels?.length + 1 || 2;
                    newSelectedSpell.id = Date.now().toString();
                    newSpells[index].levels = [
                      ...(newSpells[index].levels || []),
                      newSelectedSpell,
                    ];
                    setSelectedClass((prev) => {
                      return {
                        ...prev,
                        spells: newSpells,
                      };
                    });
                  }
                }}
              >
                Add
              </ButtonUnq>
            </FlexRow>
          </FlexCol>
        );
      };

      return (
        <FlexCol className="pb-10" id="spells">
          <label>Spells</label>
          <FlexCol>
            {selectedClass.spells &&
              selectedClass.spells.map((spell) => {
                return (
                  <>
                    <SpellsElement
                      spell={spell}
                      specs={selectedClass.specs}
                      spellsRef={spellsRef}
                      interactionBtns={
                        <>
                          <ButtonUnq
                            id={`char-add-spell-${spell.id}`}
                            onClick={(e) => {
                              const index = selectedClass.spells.findIndex(
                                (s) => s.id === spell.id
                              );
                              if (index === -1) return;
                              const newSpellState = {
                                ...spell,
                                descriptionOpen: false,
                              };
                              setSelectedSpell(newSpellState);
                              setParentId(spell.id);
                            }}
                            className="w-12 h-8 mx-1"
                          >
                            Add
                          </ButtonUnq>

                          <ButtonUnq
                            id={`char-remove-spell-${spell.id}`}
                            onClick={(e) => {
                              if ("levels" in spell) {
                                const index = selectedClass.spells.findIndex(
                                  (s) => s.id === spell.id
                                );
                                if (index === -1) return;
                                setSelectedClass((prev) => {
                                  return {
                                    ...prev,
                                    spells: prev.spells.filter(
                                      (s) => s.id !== spell.id
                                    ),
                                  };
                                });
                              } else {
                                const itsStillASpell =
                                  spell as Character.Spell.ISpellLevel;
                                const index = selectedClass.spells.findIndex(
                                  (s) =>
                                    s.levels &&
                                    s.levels.find(
                                      (l) => l.id === itsStillASpell.id
                                    )
                                );
                                if (index === -1) return;
                                const newSpells = [...selectedClass.spells];
                                const newLevels = newSpells[
                                  index
                                ].levels.filter(
                                  (s) => s.id !== itsStillASpell.id
                                );
                                newSpells[index].levels = newLevels;
                                setSelectedClass((prev) => {
                                  return {
                                    ...prev,
                                    spells: newSpells,
                                  };
                                });
                              }
                            }}
                            className="w-24 h-8"
                          >
                            Remove
                          </ButtonUnq>
                        </>
                      }
                    >
                      {spell.levels &&
                        spell.levels.map((level) => (
                          <SpellsElement
                            spell={level}
                            specs={selectedClass.specs}
                            spellsRef={spellsRef}
                            parentId={spell.id}
                            interactionBtns={
                              <>
                                <div className="w-12 h-8 mx-1"></div>
                                <ButtonUnq
                                  id={`char-remove-spell-${level.id}`}
                                  onClick={(e) => {
                                    const index =
                                      selectedClass.spells.findIndex(
                                        (s) => s.id === spell.id
                                      );
                                    if (index === -1) return;
                                    const newSpells = [...selectedClass.spells];
                                    const newLevels = newSpells[
                                      index
                                    ].levels.filter((s) => s.id !== level.id);
                                    newSpells[index].levels = newLevels;
                                    setSelectedClass((prev) => {
                                      return {
                                        ...prev,
                                        spells: newSpells,
                                      };
                                    });
                                  }}
                                  className="w-24 h-8"
                                >
                                  Remove
                                </ButtonUnq>
                              </>
                            }
                          />
                        ))}
                    </SpellsElement>
                    <hr />
                  </>
                );
              })}
            <NewSpell />
          </FlexCol>
        </FlexCol>
      );
    };

    return (
      <RndContainer
        id={`char-${selectedClass.id}`}
        aditionalIcons={
          <SaveIcon
            onClick={() => saveClass()}
            className="h-4 m-1 w-6 cursor-pointer"
          />
        }
        close={() => {
          //if (isEditedRef.current) {
          //  confirm("Are you sure you want to close without saving?") &&
          //    close();
          //  return;
          //}
          close();
          console.log("ClassHandlingWindow close");
        }}
        label={`char_${"admin1"}`}
        className=""
      >
        <FlexCol className="grow w-full">
          <InputUnq
            id={`char-name-${selectedClass.id}`}
            label="Name"
            value={selectedClass.name}
            disabled={true}
          />
          <SelectUnq
            id={`char-select-mainclass-${selectedClass.id}`}
            label="Select a main class"
            optionData={Object.values(Character.MAIN_CLASSES).map((c) => ({
              value: c,
              label: c,
            }))}
            onChange={(e) => {
              setSelectedClass((prev) => {
                return {
                  ...prev,
                  mainClass: e?.value || ("0" as Character.MAIN_CLASSES),
                };
              });
            }}
            value={{
              label: selectedClass.mainClass || "Select a class",
              value: selectedClass.mainClass || ("0" as Character.MAIN_CLASSES),
            }}
          ></SelectUnq>
          <hr />
          <InputUnq
            id={`char-input-hp-${selectedClass.id}`}
            label="hp"
            value={selectedClass.modifiers.hp}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement;
              const value = parseInt(target.value);
              console.log(value);
              setSelectedClass((prev) => {
                return {
                  ...prev,
                  modifiers: {
                    ...prev.modifiers,
                    hp: value,
                  },
                };
              });
            }}
          />
          <FlexRow>
            <label className={`grow`}>HpPerLevel</label>
            <RollItem
              id={`char-roll-hp-${selectedClass.id}`}
              addRoll={(roll) => {
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      hpLvlScaling: roll,
                    },
                  };
                });
              }}
              buttonText="Set"
              initialValues={
                selectedClass.modifiers?.hpLvlScaling
                  ? {
                      nrOfRolls:
                        selectedClass.modifiers?.hpLvlScaling.nrOfRolls || 1,
                      nrOfDices:
                        selectedClass.modifiers?.hpLvlScaling.nrOfDices || 1,
                      dice: selectedClass.modifiers?.hpLvlScaling.dice || 6,
                      constant:
                        selectedClass.modifiers?.hpLvlScaling.constant || 0,
                    }
                  : {
                      nrOfRolls: 1,
                      nrOfDices: 1,
                      dice: 6,
                      constant: 0,
                    }
              }
            />
          </FlexRow>
          <InputUnq
            id={`char-input-ep-${selectedClass.id}`}
            label="ep"
            value={selectedClass.modifiers.ep}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement;
              const value = target.value;
              setSelectedClass((prev) => {
                return {
                  ...prev,
                  modifiers: {
                    ...prev.modifiers,
                    ep: parseInt(value),
                  },
                };
              });
            }}
          />
          <hr />
          <FlexCol className="grow">
            <label>HM</label>
            <InputUnq
              id={`char-input-atk-${selectedClass.id}`}
              label={Character.HM.ATK}
              value={selectedClass.modifiers.hm.ATK}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      hm: {
                        ...prev.modifiers.hm,
                        ATK: parseInt(value),
                      },
                    },
                  };
                });
              }}
            />
            <InputUnq
              id={`char-input-def-${selectedClass.id}`}
              label={Character.HM.DEF}
              value={selectedClass.modifiers.hm.DEF}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      hm: {
                        ...prev.modifiers.hm,
                        DEF: parseInt(value),
                      },
                    },
                  };
                });
              }}
            />
            <InputUnq
              id={`char-input-ini-${selectedClass.id}`}
              label={Character.HM.INI}
              value={selectedClass?.modifiers.hm.INI || ""}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      hm: {
                        ...prev.modifiers.hm,
                        INI: parseInt(value),
                      },
                    },
                  };
                });
              }}
            />
            <InputUnq
              id={`char-input-aim-${selectedClass.id}`}
              label={Character.HM.AIM}
              value={selectedClass?.modifiers.hm.AIM || ""}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      hm: {
                        ...prev.modifiers.hm,
                        AIM: parseInt(value),
                      },
                    },
                  };
                });
              }}
              type="number"
            />
            <InputUnq
              id={`char-input-startinghp-${selectedClass.id}`}
              label="startingHmPoints"
              value={selectedClass.modifiers.hmPlus.initial}
              onBlur={(e) => {
                console.log(selectedClass);
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      hmPlus: {
                        ...prev.modifiers.hmPlus,
                        initial: parseInt(value),
                      },
                    },
                  };
                });
              }}
              type="number"
            />
            <InputUnq
              id={`char-input-hmPerLvl-${selectedClass.id}`}
              label="hmPointsPerLevel"
              value={selectedClass.modifiers.hmPlus.perLvl}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setSelectedClass((prev) => {
                  return {
                    ...prev,
                    modifiers: {
                      ...prev.modifiers,
                      hmPlus: {
                        ...prev.modifiers.hmPlus,
                        perLvl: parseInt(value),
                      },
                    },
                  };
                });
              }}
            />
          </FlexCol>
          <hr />
          {Object.values(Character.PRIMARY_STATS).map((stat) => {
            return (
              <FlexRow>
                <label className={`grow p-1`}>{stat}</label>
                <RollItem
                  id={`char-roll-${stat}-${selectedClass.id}`}
                  addRoll={(roll) => {
                    setSelectedClass((prev) => {
                      return {
                        ...prev,
                        modifiers: {
                          ...prev.modifiers,
                          primaryStats: [
                            ...prev.modifiers.primaryStats,
                            {
                              name: stat,
                              roll: roll,
                            },
                          ],
                        },
                      };
                    });
                  }}
                  buttonText="Set"
                  initialValues={{
                    nrOfRolls:
                      selectedClass.modifiers.primaryStats.find(
                        (s) => s.name === stat
                      )?.roll?.nrOfRolls || 1,
                    nrOfDices:
                      selectedClass.modifiers.primaryStats.find(
                        (s) => s.name === stat
                      )?.roll?.nrOfDices || 1,
                    dice: (selectedClass.modifiers.primaryStats.find(
                      (s) => s.name === stat
                    )?.roll?.dice || 6) as Adventure.DICE,
                    constant:
                      selectedClass.modifiers.primaryStats.find(
                        (s) => s.name === stat
                      )?.roll?.constant || 0,
                  }}
                />
              </FlexRow>
            );
          })}
          <hr />
          <SecondaryStatScalings />

          <hr />
          <FlexCol className="grow">
            <label onClick={() => setshowSecondaryStats((prev) => !prev)}>
              Secondary Stats
            </label>
            {showSecondaryStats && (
              <SecondaryStatLevelsElement
                statArray={Object.keys(Character.SECONDARY_STATS).map(
                  (keyProp) => {
                    const key =
                      keyProp as keyof typeof Character.SECONDARY_STATS;
                    return {
                      id: Math.random().toString(),
                      name: Character.SECONDARY_STATS[key],
                      skillLevel:
                        selectedClass.modifiers.secondaryStats.find(
                          (s) => s.name === Character.SECONDARY_STATS[key]
                        )?.skillLevel || Character.SECONDARY_STAT_LEVEL.BASIC,
                      skill:
                        selectedClass.modifiers.secondaryStats.find(
                          (s) => s.name === Character.SECONDARY_STATS[key]
                        )?.skill || 0,
                      lvlReq:
                        selectedClass.modifiers.secondaryStats.find(
                          (s) => s.name === Character.SECONDARY_STATS[key]
                        )?.lvlReq || 0,
                    };
                  }
                )}
                secondaryStatRefs={secondaryStatRefs}
              />
            )}
          </FlexCol>
          <hr />
          <Specs />
          <hr />
          <Spells />
        </FlexCol>
      </RndContainer>
    );
  };
  return (
    <>
      <FlexCol className="flex-wrap basis-1/2" preventShrink={true}>
        <SelectUnq
          id="char-select-class"
          label="Classes"
          optionData={
            classList
              ? classList.map((c) => ({ value: c.id, label: c.name }))
              : []
          }
          onChange={(e) => {
            getSelectedClass(e).then((response) => {
              windowsLayer.addWindow({
                name: "Class",
                icon: <div>Class</div>,
                jsx: ({ close, isOpen, selectWindow }) => {
                  return (
                    <ClassHandlingWindow
                      close={close}
                      isOpen={isOpen}
                      selectWindow={selectWindow}
                      selectedClassProps={response.data}
                    />
                  );
                },
              });
            });
          }}
          value={{
            label: "Select a class",
            value: "0" as Character.CLASSES,
          }}
        ></SelectUnq>
        <ButtonUnq id="char-get-all-classes" onClick={(e) => getAllClasses()}>
          GETALLCLASSES
        </ButtonUnq>
      </FlexCol>
      <DescentHandling />
    </>
  );
}

const DescriptionElement = memo(function ({
  spell,
  onSave,
}: {
  spell: Character.Spell.TSpellElements | Character.Spell.ISpellLevel;
  onSave: (e: string) => void;
}) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  return (
    <FlexCol>
      <FlexRow>
        <EditIcon
          className="h-4 m-1 w-6 cursor-pointer"
          onClick={() => {
            setDescriptionOpen((prev) => !prev);
          }}
        />
        <label htmlFor="">description</label>
      </FlexRow>

      {descriptionOpen ? (
        <TextAreaUnq
          id={`spell-list-description-${spell.id}`}
          value={spell.description}
          element="editor"
          className="grow"
          onSave={(e) => {
            const msg = e;
            if (msg === spell.description) return;
            onSave(msg);
          }}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `${spell.description}`,
          }}
          className={`w-64`}
        ></div>
      )}
    </FlexCol>
  );
});

const SpellsElement = memo(function ({
  spell,
  specs,
  spellsRef,
  parentId,
  children,
  interactionBtns,
}: {
  spell: Character.Spell.TSpellElements | Character.Spell.ISpellLevel;
  specs: {
    name: string;
    description: string;
  }[];
  spellsRef: MutableRef<{
    [key in string]:
      | Character.Spell.TSpellElements
      | Character.Spell.ISpellLevel;
  }>;
  parentId?: string;
  children?: ComponentChildren;
  interactionBtns: ComponentChildren;
}) {
  const [spellState, setSpellState] = useState<
    Character.Spell.TSpellElements | Character.Spell.ISpellLevel
  >(
    typeof "levels" in spell
      ? (spell as Character.Spell.TSpellElements)
      : (spell as Character.Spell.ISpellLevel)
  );

  useEffect(() => {
    const newSpell = {
      ...spellState,
      levels: undefined,
      parentId: parentId || "0",
    };
    spellsRef.current[spellState.id] = newSpell;
    return () => {
      delete spellsRef.current[spellState.id];
    };
  }, [spellState]);

  return (
    <FlexCol>
      <FlexRow
        className={`${
          "levels" in spellState && spellState.levels ? "bg-gray-300" : ""
        }`}
      >
        <InputUnq
          id={`char-input-rank-${spellState.id}`}
          label="rank"
          value={"rank" in spellState && spellState.rank ? spellState.rank : 1}
          widthOverride="w-24"
          layout="flex-col"
          onInput={(e) => {
            console.log(e);
            const target = e.target as HTMLInputElement;
            const value = parseInt(target.value);
            if (isNaN(value)) return;
            if (value < 2) {
              target.value = "2";
              return;
            }
            setSpellState((prev) => {
              return {
                ...prev,
                rank: value,
              };
            });
          }}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            const value = parseInt(target.value);
            if (isNaN(value)) return;
            if (value < 2) {
              target.value = "2";
              return;
            }
            //reorderRanks(spellState.id, value);
            setSpellState((prev) => {
              return {
                ...prev,
                rank: value,
              };
            });
          }}
          disabled={parentId ? false : true}
        />
        <InputUnq
          id={`char-input-spell-${spellState.id}`}
          label="name"
          value={spellState.name}
          layout="flex-col"
          widthOverride="w-24"
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            setSpellState((prev) => {
              return {
                ...prev,
                name: value,
              };
            });
          }}
          className={`grow w-24`}
          disabled={!("levels" in spellState)}
        />
        <SelectUnq
          id={`char-select-spec-${spellState.id}`}
          label="spec"
          optionData={[
            {
              value: "common",
              label: "common",
            },
            ...specs.map((c) => ({
              value: c.name,
              label: c.name,
            })),
          ]}
          onChange={(e) => {
            const val = e?.value || "common";
            setSpellState((prev) => {
              return {
                ...prev,
                spec: val,
              };
            });
          }}
          value={{
            label: spellState.spec,
            value: spellState.spec,
          }}
          layout="flex-col"
          widthOverride="w-24"
          disabled={!("levels" in spellState)}
        />
        <SelectUnq
          id={`char-select-type-${spellState.id}`}
          label="type"
          optionData={[
            {
              value: "damage",
              label: "damage",
            },
            {
              value: "heal",
              label: "heal",
            },
            {
              value: "utility",
              label: "utility",
            },
          ]}
          value={{
            label: spellState.type,
            value: spellState.type,
          }}
          onChange={(e) => {
            const val = e?.value as Character.Spell.TSpellType;
            setSpellState((prev) => {
              return {
                ...prev,
                type: val,
              };
            });
          }}
          layout="flex-col"
          widthOverride="w-24"
          disabled={!("levels" in spellState)}
        />
        <InputUnq
          id={`char-input-lvlReq-${spellState.id}`}
          label="lvlReq"
          value={spellState.lvlReq}
          type="number"
          layout="flex-col"
          widthOverride="w-24"
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            const value = parseInt(target.value);
            setSpellState((prev) => {
              return {
                ...prev,
                lvlReq: value,
              };
            });
          }}
        />
        <InputUnq
          id={`char-input-nrOfTurnsToCast-${spellState.id}`}
          label="resourceCost"
          value={spellState.resourceCost}
          type="number"
          onBlur={(e) => {
            console.log(e);
            const target = e.target as HTMLInputElement;
            const value = parseInt(target.value);
            setSpellState((prev) => {
              return {
                ...prev,
                resourceCost: value,
              };
            });
          }}
          layout="flex-col"
          widthOverride="w-24"
        />
        <InputUnq
          id={`char-input-nrOfTurns-${spellState.id}`}
          label="nrOfTurns"
          value={spellState.nrOfTurns}
          type="number"
          onBlur={(e) => {
            console.log(e);
            const target = e.target as HTMLInputElement;
            const value = parseInt(target.value);
            setSpellState((prev) => {
              return {
                ...prev,
                nrOfTurns: value,
              };
            });
          }}
          layout="flex-col"
          widthOverride="w-24"
        />
        <InputUnq
          id={`char-input-range-${spellState.id}`}
          label="range"
          value={spellState.range}
          type="number"
          onBlur={(e) => {
            console.log(e);
            const target = e.target as HTMLInputElement;
            const value = parseInt(target.value);
            setSpellState((prev) => {
              return {
                ...prev,
                range: value,
              };
            });
          }}
          layout="flex-col"
          widthOverride="w-24"
        />
        <SelectUnq
          id={`char-select-class-${spellState.id}`}
          label="SpellClass"
          optionData={Object.keys(Character.Spell.SPELL_CLASSES).map((c) => ({
            value: c,
            label: c,
          }))}
          onChange={(e) => {
            const val = e?.value as Character.Spell.SPELL_CLASSES;
            setSpellState((prev) => {
              return {
                ...prev,
                class: val,
              };
            });
          }}
          value={{
            label: spellState.class,
            value: spellState.class,
          }}
          layout="flex-col"
          widthOverride="w-24"
        />
        <CheckboxUnq
          id={`char-input-passive-${spellState.id}`}
          label={`passive`}
          value={spellState.passive}
          onChange={(e) => {
            console.log(e);
            const target = e.target as HTMLInputElement;
            console.log(target);
            const val = target.checked;
            console.log(val);
            if (!val) return;
            setSpellState((prev) => {
              return {
                ...prev,
                passive: val,
              };
            });
          }}
          layout="flex-col"
          widthOverride="w-24"
        />
        <DescriptionElement
          spell={spellState}
          onSave={(e) => {
            setSpellState((prev) => {
              return {
                ...prev,
                description: e,
              };
            });
          }}
        />
        {interactionBtns}
      </FlexRow>
      {children}
    </FlexCol>
  );
});

export default ClassHandling;
