// import @appTypes/shared_types
import { Character } from "@appTypes/shared_types";
import { useEffect, useRef, useState } from "preact/hooks";
import { FlexCol, FlexRow } from "../../components/Flex";
import {
  HTMLOptionData,
  InputUnq,
  SelectUnq,
  TextAreaUnq,
} from "../../components/GeneralElements";
import useRequest from "../../hooks/request";
import CharAstralIcon from "../../components/icons/magus/CharAstralIcon";
import CharIntIcon from "../../components/icons/magus/CharIntIcon";
import CharPerIcon from "../../components/icons/magus/CharPerIcon";
import CharStrIcon from "../../components/icons/magus/CharStrIcon";
import CharDexIcon from "../../components/icons/magus/CharDexIcon";
import CharSpeIcon from "../../components/icons/magus/CharSpeIcon";
import CharWipIcon from "../../components/icons/magus/CharWipIcon";
import CharHeaIcon from "../../components/icons/magus/CharHeaIcon";
import CharBeaIcon from "../../components/icons/magus/CharBeaIcon";
import CharConIcon from "../../components/icons/magus/CharConIcon";
import CharHMATKIcon from "../../components/icons/magus/CharHMATKIcon";
import CharHMDEFIcon from "../../components/icons/magus/CharHMDEFIcon";
import CharHMAIMIcon from "../../components/icons/magus/CharHMAIMIcon";
import CharHMINIIcon from "../../components/icons/magus/CharHMINIICon";
import Notes from "../Notes";
import { useWindowsLayer } from "../WindowsLayer";

const inventoryDummy: () => Character.Item.TInventory = () => {
  const money: Character.Item.TMoney = [
    {
      amount: 0,
      name: Character.Item.MONEY.GOLD,
    },
    {
      amount: 0,
      name: Character.Item.MONEY.SILVER,
    },
    {
      amount: 0,
      name: Character.Item.MONEY.COPPER,
    },
  ];

  function getBag(): Character.Item.TBackpack {
    const size: Character.Item.TBackpackSize = {
      sizeX: 5 * Math.random(),
      sizeY: 5 * Math.random(),
      slotAmount: 25,
      weight: 10 * Math.random(),
    };

    function itemGenerator(): Character.Item.TItem {
      const hm: Character.THm = {
        AIM: 10 * Math.random(),
        ATK: 10 * Math.random(),
        DEF: 10 * Math.random(),
        INI: 10 * Math.random(),
      };
      const sizeX = 3 * Math.random();
      const sizeY = 3 * Math.random();
      const weight = sizeX * sizeY * 3 * Math.random();
      const item: Character.Item.TItem = {
        name: "Item",
        hm: hm,
        description: "Description",
        size: {
          sizeX: sizeX,
          sizeY: sizeY,
          weight: weight,
        },
        position: {
          placeX: 0,
          placeY: 0,
        },
        equipable: null,
      };
      return item;
    }

    const items: { amount: number; item: Character.Item.TItem }[] = [];
    for (let i = 0; i < 5; i++) {
      items.push({ amount: 1, item: itemGenerator() });
    }
    const bagpackSize: Character.Item.TBackpackSize = {
      sizeX: 5 * Math.random(),
      sizeY: 5 * Math.random(),
      slotAmount: 25,
      weight: 1,
    };
    return {
      size: bagpackSize,
      items: items,
    };
  }
  return {
    money: money,
    backpacks: [getBag()],
  };
};

export default function CharacterPage({ advId = "" }: { advId: string }) {
  const [selectedCharacter, setSelectedCharacter] =
    useState<Character.TCharacter>({} as Character.TCharacter);
  const { addWindow, removeWindow } = useWindowsLayer();
  const descentsRef = useRef<Array<HTMLOptionData<Character.DESCENTS>>>([]);
  const classesRef = useRef<Array<HTMLOptionData<Character.CLASSES>>>([]);

  const isNewCharacter =
    selectedCharacter.rp && selectedCharacter.rp.name ? false : true;

  const characterRef = useRef<any[]>([]);

  const [characterRequest] = useRequest("characters");

  useEffect(() => {
    const fetch = async () => {
      const [respChar, respClass, respDesc] = await Promise.all([
        characterRequest({
          endPoint: "/get",
          body: {
            advId: advId,
            uid: "admin",
          },
        }),
        characterRequest({
          endPoint: "/getAllClasses",
        }),
        characterRequest({
          endPoint: "/getAllDescents",
        }),
      ]);
      if (!respChar.data || !respClass.data || !respDesc.data) return;
      descentsRef.current = respDesc.data;
      classesRef.current = respClass.data;
      setSelectedCharacter(respChar.data);
    };
    fetch();
  }, [advId]);

  useEffect(() => {
    addWindow({
      jsx: ({ close, isOpen, selectWindow, classes }) => (
        <Notes
          close={close}
          isOpen={isOpen}
          selectWindow={selectWindow}
          classes={classes}
        />
      ),
      name: "Notes",
      icon: <>N</>,
    });
    return () => {
      removeWindow("Notes");
    };
  }, []);

  //const [inventory, setInventory] = useState<Character.Item.TInventory>(
  //  inventoryDummy()
  //);

  return (
    <FlexRow className="flex-wrap justify-center items-start w-full">
      <Header
        name={selectedCharacter.rp ? selectedCharacter.rp.name : "János"}
        descent={selectedCharacter.descent || Character.DESCENTS.HUMAN}
        class={selectedCharacter.class || Character.CLASSES.WARRIOR}
        lvl={selectedCharacter.level ? selectedCharacter.level.current : 1}
      />
      <FlexCol>
        {/*<PrimaryAttributes
          name={selectedCharacter.rp ? selectedCharacter.rp.name : ""}
          descent={selectedCharacter.descent || ""}
          classProp=""
          bioType={selectedCharacter.rp ? selectedCharacter.rp.bioType : ""}
          className="max-h-40 m-2 space-between"
        />*/}
        {/*<RPData className="max-h-40 m-2" />*/}
      </FlexCol>
      <FlexCol className={`flex-wrap`} preventShrink={true}>
        {/*<PrimaryStats className="m-2" />*/}

        {/*<LevelData className="max-h-40 m-2" />*/}
      </FlexCol>
      <FlexCol>
        {/*<HMData className="max-h-40 m-2" />*/}
        {/*<HealthAndResourceData className="max-h-40 m-2" />*/}
      </FlexCol>
      <SecondaryStats className="max-h-80 m-2" />
      <Bag inventory={inventoryDummy()} className="max-h-40 m-2" />
    </FlexRow>
  );

  function PrimaryAttributes({
    name,
    descent,
    bioType,
    classProp,
    className,
  }: {
    name: string;
    descent: string;
    bioType: string;
    classProp: string;
    className?: string;
  }) {
    const [primaryAttributes, setPrimaryAttributes] = useState({
      name: name,
      descent: descent,
      bioType: bioType,
    });

    const classListRef = useRef<Array<HTMLOptionData<Character.CLASSES>>>(
      Object.keys(Character.CLASSES).map((key) => {
        const value = Character.CLASSES[key as keyof typeof Character.CLASSES];
        return {
          value: value,
          label: value,
        };
      })
    );

    const descentListRef = useRef<Array<HTMLOptionData<Character.DESCENTS>>>(
      Object.keys(Character.DESCENTS).map((key) => {
        const value =
          Character.DESCENTS[key as keyof typeof Character.DESCENTS];
        return {
          label: value,
          value: value,
        };
      })
    );

    const bioTypeListRef = useRef<Array<HTMLOptionData<Character.BTYPE>>>(
      Object.keys(Character.BTYPE).map((key) => ({
        label: Character.BTYPE[key as keyof typeof Character.BTYPE],
        value: Character.BTYPE[key as keyof typeof Character.BTYPE],
      }))
    );

    return (
      <FlexCol className={`${className ? className + " " : ""}overflow-auto`}>
        <InputUnq
          id="char-name"
          label={Character.RP_STATS.NAME}
          value={primaryAttributes.name}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            console.log("asd");
            setPrimaryAttributes({ ...primaryAttributes, name: value });
          }}
          placeholder="Name"
          disabled={!isNewCharacter}
        />
        <SelectUnq
          id="char-descent"
          optionData={descentListRef.current}
          label={Character.RP_STATS.DESCENTS}
          value={{
            label: primaryAttributes.descent,
            value: primaryAttributes.descent,
          }}
          onChange={(e) => {
            const target = e as HTMLOptionElement;
            const value = target.value as Character.DESCENTS;
            setPrimaryAttributes({ ...primaryAttributes, descent: value });
          }}
          disabled={false}
        />
        <SelectUnq
          id="char-bioType"
          optionData={bioTypeListRef.current}
          label={Character.RP_STATS.BTYPE}
          value={{
            label: primaryAttributes.bioType,
            value: primaryAttributes.bioType,
          }}
          onChange={(e) => {
            const target = e as HTMLOptionElement;
            const value = target.value as Character.BTYPE;
            setPrimaryAttributes({ ...primaryAttributes, bioType: value });
          }}
          disabled={false}
        />
        {
          <SelectUnq
            id="char-class"
            optionData={classListRef.current}
            label={Character.RP_STATS.CLASSES}
            value={{
              label: classProp || "",
              value: classProp,
            }}
            onChange={() => {}}
            disabled={false}
          />
        }
      </FlexCol>
    );
  }

  function RPData({ className }: { className?: string }) {
    const textAreaKeys: Character.RP_STATS[keyof Character.RP_STATS][] = [
      Character.RP_STATS.HAIR_DESCRIPTION,
      Character.RP_STATS.EYE_DESCRIPTION,
      Character.RP_STATS.DESCRIPTION,
      Character.RP_STATS.SCHOOLS,
    ];

    const rpData: Record<string, string> = {
      [Character.RP_STATS.PERSONALITY]: "",
      [Character.RP_STATS.RELIGION]: "",
      [Character.RP_STATS.BORN_PLACE]: "",
      [Character.RP_STATS.AGE]: "",
      [Character.RP_STATS.SKIN_COLOR]: "",
      [Character.RP_STATS.HAIR_DESCRIPTION]: "",
      [Character.RP_STATS.HAIR_COLOR]: "",
      [Character.RP_STATS.EYE_COLOR]: "",
      [Character.RP_STATS.EYE_DESCRIPTION]: "",
      [Character.RP_STATS.HEIGHT]: "",
      [Character.RP_STATS.WEIGHT]: "",
      [Character.RP_STATS.DESCRIPTION]: "",
      [Character.RP_STATS.SCHOOLS]: "",
      [Character.RP_STATS.KNOWN_LANGUAGES]: "",
      [Character.RP_STATS.PROFESSIONS]: "",
    };

    return (
      <FlexCol className={`${className ? className + " " : ""}overflow-auto`}>
        {Object.keys(rpData).map((key) =>
          textAreaKeys.includes(key) ? (
            <TextAreaUnq
              id={key}
              label={key}
              value={rpData[key]}
              onChange={() => {}}
              onSave={() => {}}
              disabled={false}
            />
          ) : (
            <InputUnq
              id={key}
              label={key}
              value={rpData[key]}
              onChange={() => {}}
              disabled={false}
            />
          )
        )}
      </FlexCol>
    );
  }

  function LevelData({ className }: { className?: string }) {
    const levelValues = {
      current: selectedCharacter.level
        ? selectedCharacter.level.current || 1
        : 1,
      currentXp: selectedCharacter.level
        ? selectedCharacter.level.currentXp || 0
        : 0,
      nextXp: selectedCharacter.level
        ? selectedCharacter.level.nextXp || Character.LEVEL_CAPS[0]
        : Character.LEVEL_CAPS[0],
    };
    return (
      <FlexCol className={className}>
        <InputUnq
          id="chardatasheet-level"
          label={Character.LEVELS.LEVEL}
          value={levelValues.current}
          onChange={() => {}}
          disabled={true}
          widthOverride="w-24"
        />
        <InputUnq
          id="chardatasheet-current-xp"
          label={Character.LEVELS.CURRENT_XP}
          value={levelValues.currentXp}
          onChange={() => {}}
          disabled={true}
          widthOverride="w-24"
        />
        <InputUnq
          id="chardatasheet-next-level"
          label={Character.LEVELS.NEXT_LEVEL}
          value={levelValues.nextXp}
          onChange={() => {}}
          disabled={true}
          widthOverride="w-24"
        />
      </FlexCol>
    );
  }

  function HealthAndResourceData({ className }: { className?: string }) {
    const hpAndResDataValues = {
      maxHp: selectedCharacter.resource
        ? selectedCharacter.resource.health.maxHp
        : 0,
      currentHp: selectedCharacter.resource
        ? selectedCharacter.resource.health.currentHp
        : 0,
      maxEp: selectedCharacter.resource
        ? selectedCharacter.resource.health.maxEp
        : 0,
      currentEp: selectedCharacter.resource
        ? selectedCharacter.resource.health.currentEp
        : 0,
      resourceType: selectedCharacter.resource
        ? selectedCharacter.resource.abilities.name
        : "",
      maxResource: selectedCharacter.resource
        ? selectedCharacter.resource.abilities.max
        : 0,
      currentResource: selectedCharacter.resource
        ? selectedCharacter.resource.abilities.name
        : 0,
      regen: "1/kör",
    };
    return (
      <FlexCol>
        <FlexCol className={className}>
          <InputUnq
            id="char-max-hp"
            label={Character.STATS.MAX_HP}
            value={hpAndResDataValues.maxHp}
            onChange={() => {}}
            disabled={true}
            widthOverride="w-24"
          />
          <InputUnq
            id="char-current-hp"
            label={Character.STATS.CURRENT_HP}
            value={hpAndResDataValues.currentHp}
            onChange={() => {}}
            disabled={true}
            widthOverride="w-24"
          />
          <InputUnq
            id="char-max-ep"
            label={Character.STATS.MAX_EP}
            value={hpAndResDataValues.maxEp}
            onChange={() => {}}
            disabled={true}
            widthOverride="w-24"
          />
          <InputUnq
            id="char-current-ep"
            label={Character.STATS.CURRENT_EP}
            value={hpAndResDataValues.currentEp}
            onChange={() => {}}
            disabled={true}
            widthOverride="w-24"
          />
        </FlexCol>
        <FlexCol>
          <InputUnq
            id="char-resource-type"
            label={
              selectedCharacter.resource
                ? selectedCharacter.resource.abilities.name
                : "valami"
            }
            value={hpAndResDataValues.resourceType}
            onChange={() => {}}
            disabled={true}
            widthOverride="w-24"
          />
          <InputUnq
            id="char-current-resource"
            label={`max ${hpAndResDataValues.resourceType}`}
            value={hpAndResDataValues.maxResource}
            onChange={() => {}}
            disabled={true}
            widthOverride="w-24"
          />
          <InputUnq
            id="char-regen"
            label={Character.RP_STATS.RESOURCE_REGEN}
            value={hpAndResDataValues.regen}
            onChange={() => {}}
            disabled={true}
            widthOverride="w-24"
          />
        </FlexCol>
      </FlexCol>
    );
  }

  function SecondaryStats({ className }: { className?: string }) {
    const secondaryStatValues: Character.TSecondaryStat[] = Object.keys(
      Character.SECONDARY_STATS
    ).map((key) => {
      const secondaryStat = selectedCharacter.secondaryStats
        ? selectedCharacter.secondaryStats.find((stat) => stat.name === key)
        : null;
      if (secondaryStat) return secondaryStat;
      return {
        id: "",
        name: Character.SECONDARY_STATS[
          key as keyof typeof Character.SECONDARY_STATS
        ],
        skill: 0,
        skillLevel: Character.SECONDARY_STAT_LEVEL.BASIC,
        lvlReq: 0,
      };
    });

    return (
      <FlexCol className={`${className ? className + " " : ""}overflow-auto`}>
        {secondaryStatValues.map((val) => (
          <FlexRow>
            <label for={""} className={`grow`}>
              {val.name}
            </label>
            <p>{val.skillLevel}</p>
            <InputUnq
              id={`charactersheet-secondarystats-${val.id}-lvl`}
              label={""}
              value={val.skill}
              onChange={() => {}}
              disabled={true}
              widthOverride="w-16"
            />
          </FlexRow>
        ))}
      </FlexCol>
    );
  }
}

function StatIconValueElement({
  icon,
  value,
  label,
  className,
}: {
  icon: JSX.Element;
  value: number;
  label: string;
  className?: string;
}) {
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  return (
    <FlexCol
      className={`${className ? className + " " : ""}m-1 relative`}
      //onPointerMove={(e) => {
      //  console.log(e);
      //  if (!e || e.clientX === 0 || e.clientY === 0) return;
      //  setPopupPos({ x: e.clientX, y: e.clientY });
      //}}
      onPointerLeave={() => {
        setPopupPos({ x: 0, y: 0 });
      }}
      preventShrink={true}
    >
      <div className={`pointer-events-none`}>{icon}</div>
      <p className="text-center">{value}</p>
      <p className={`text-center`}>
        {label && label.length > 4 ? label.substring(0, 4) : label}
      </p>
    </FlexCol>
  );
}

function Header(data: {
  name: string;
  descent: string;
  class: string;
  lvl: number;
}) {
  const [showRP, setShowRP] = useState(false);

  const XpBar = () => {
    const [lvlData, setLvlData] = useState({
      current: 150,
      prevXP: 100,
      nextXp: 200,
      currentXp: 150,
    });
    const xpBar = useRef<HTMLDivElement>(null);
    const xpBarFill = useRef<HTMLDivElement>(null);
    const xpBarText = useRef<HTMLDivElement>(null);

    const [showText, setShowText] = useState(false);

    useEffect(() => {
      const xpBarWidth = xpBar.current?.clientWidth || 0;
      const fillWidth = (lvlData.currentXp / lvlData.nextXp) * xpBarWidth;
      xpBarFill.current!.style.width = `${fillWidth}px`;
      if (xpBarText.current)
        xpBarText.current!.innerText = `${lvlData.currentXp}/${lvlData.nextXp}`;
    }, [lvlData, showText]);

    useEffect(() => {
      const resizeEvent = () => {
        const xpBarWidth = xpBar.current?.clientWidth || 0;
        const fillWidth = (lvlData.currentXp / lvlData.nextXp) * xpBarWidth;
        xpBarFill.current!.style.width = `${fillWidth}px`;
        if (xpBarText.current)
          xpBarText.current!.innerText = `${lvlData.currentXp}/${lvlData.nextXp}`;
      };

      window.addEventListener("resize", resizeEvent);

      return () => {
        window.removeEventListener("resize", resizeEvent);
      };
    }, []);

    return (
      <div className="flex items center justify-between w-full bg-gray-300 relative">
        <div
          className="w-full bg-gray-500"
          ref={xpBar}
          onPointerDown={(e) => setShowText((prev) => !prev)}
          onTouchStart={(e) => setShowText((prev) => !prev)}
          onClick={(e) => console.log(e)}
        >
          <div className="h-4 bg-green-500" ref={xpBarFill}></div>
        </div>
        {showText && (
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none`}
            ref={xpBarText}
          ></div>
        )}
      </div>
    );
  };

  const ResourceBar = () => {
    const [healthData, setHealthData] = useState({
      maxHp: 100,
      currentHp: 50,
      maxEp: 100,
      currentEp: 50,
      mana: 100,
      currentMana: 30,
    });

    return (
      <FlexRow>
        <ResourceBarElement
          backgroundImg="resource_health_bg.png"
          fillImg="resource_bubble_health.png"
          fillHeight={(healthData.currentHp / healthData.maxHp) * 70}
          fillText={`${healthData.currentHp}/\n${healthData.maxHp}`}
        />
        <ResourceBarElement
          backgroundImg="resource_health_bg.png"
          fillImg="resource_bubble_ep.png"
          fillHeight={(healthData.currentEp / healthData.maxEp) * 70}
          fillText={`${healthData.currentEp}/\n${healthData.maxEp}`}
        />
        <ResourceBarElement
          backgroundImg="resource_health_bg.png"
          fillImg="resource_bubble_mana.png"
          fillHeight={(healthData.currentMana / healthData.mana) * 70}
          fillText={`${healthData.currentMana}/\n${healthData.mana}`}
        />
      </FlexRow>
    );

    function ResourceBarElement({
      backgroundImg,
      fillImg,
      fillHeight,
      fillText,
      className,
      height,
    }: {
      backgroundImg: string;
      fillImg: string;
      fillHeight: number;
      fillText: string;
      className?: string;
      height?: number;
    }) {
      const bar = useRef<HTMLDivElement>(null);
      const fill = useRef<HTMLImageElement>(null);
      const text = useRef<HTMLDivElement>(null);
      const [showText, setShowText] = useState(false);

      const barHeight = height || 50;

      useEffect(() => {
        fill.current!.style.height = `${fillHeight}px`;
        if (text.current) text.current!.innerText = fillText;
      }, [fillHeight, showText]);

      const backgroundImgPath = "/imgs/" + backgroundImg;
      const fillImgPath = "/imgs/" + fillImg;
      const transparentBubblePath = "/imgs/transparent_bubble.png";

      return (
        <div
          className={`${
            className ? className + " " : ""
          }relative m-1 w-[50px] h-[50px]`}
          ref={bar}
          onClick={(e) => setShowText((prev) => !prev)}
        >
          <img
            className={`absolute bottom-0 left-0 bg-cover w-[50px] h-[50px] object-cover object-bottom`}
            src={backgroundImgPath}
            alt=""
          />

          <img
            className={`absolute bottom-0 left-0 bg-cover w-[50px] h-[50px] object-cover object-bottom`}
            src={fillImgPath}
            alt=""
            ref={fill}
          />
          {showText && (
            <div
              className={`absolute bottom-0 left-0 bg-cover w-[50px] h-[50px] object-cover object-bottom z-10 text-white text-center align-middle`}
              ref={text}
            ></div>
          )}
        </div>
      );
    }
  };

  const RPElement = () => {
    const textAreaKeys: Character.RP_STATS[keyof Character.RP_STATS][] = [
      Character.RP_STATS.HAIR_DESCRIPTION,
      Character.RP_STATS.EYE_DESCRIPTION,
      Character.RP_STATS.DESCRIPTION,
      Character.RP_STATS.SCHOOLS,
    ];

    const rpData: Record<string, string> = {
      [Character.RP_STATS.PERSONALITY]: "",
      [Character.RP_STATS.RELIGION]: "",
      [Character.RP_STATS.BORN_PLACE]: "",
      [Character.RP_STATS.AGE]: "",
      [Character.RP_STATS.SKIN_COLOR]: "",
      [Character.RP_STATS.HAIR_DESCRIPTION]: "",
      [Character.RP_STATS.HAIR_COLOR]: "",
      [Character.RP_STATS.EYE_COLOR]: "",
      [Character.RP_STATS.EYE_DESCRIPTION]: "",
      [Character.RP_STATS.HEIGHT]: "",
      [Character.RP_STATS.WEIGHT]: "",
      [Character.RP_STATS.DESCRIPTION]: "",
      [Character.RP_STATS.SCHOOLS]: "",
      [Character.RP_STATS.KNOWN_LANGUAGES]: "",
      [Character.RP_STATS.PROFESSIONS]: "",
    };

    return (
      <FlexCol className={`overflow-auto max-h-80 bg-blue-400`}>
        <FlexCol className="mt-10">
          {Object.keys(rpData).map((key) =>
            textAreaKeys.includes(key) ? (
              <TextAreaUnq
                id={key}
                label={key}
                value={rpData[key]}
                onChange={() => {}}
                onSave={() => {}}
                disabled={false}
              />
            ) : (
              <InputUnq
                id={key}
                label={key}
                value={rpData[key]}
                onChange={() => {}}
                disabled={false}
              />
            )
          )}
        </FlexCol>
      </FlexCol>
    );
  };

  const PrimaryStats = ({ className }: { className?: string }) => {
    //const statValues = Object.keys(Character.PRIMARY_STATS).map((key) => {
    //  if (selectedCharacter.primaryStats === undefined)
    //    return {
    //      name: Character.PRIMARY_STATS[
    //        key as keyof typeof Character.PRIMARY_STATS
    //      ],
    //      value: 0,
    //    };
    //  const value = selectedCharacter.primaryStats.find(
    //    (stat) => stat.name === key
    //  );
    //  return {
    //    name: Character.PRIMARY_STATS[
    //      key as keyof typeof Character.PRIMARY_STATS
    //    ],
    //    value: value ? value.val || 0 : 0,
    //  };
    //});
    return (
      <FlexRow
        className={`${className ? className + " " : ""}overflow-auto flex-wrap`}
        preventShrink={true}
      >
        <StatIconValueElement
          icon={<CharAstralIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.AST}
          className="ml-[105px]"
        />
        <StatIconValueElement
          icon={<CharIntIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.INT}
        />
        <StatIconValueElement
          icon={<CharStrIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.STR}
        />
        <StatIconValueElement
          icon={<CharDexIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.DEX}
        />
        <StatIconValueElement
          icon={<CharSpeIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.SPE}
        />
        <StatIconValueElement
          icon={<CharWipIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.WIP}
        />
        <StatIconValueElement
          icon={<CharConIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.CON}
        />
        <StatIconValueElement
          icon={<CharHeaIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.HEA}
        />
        <StatIconValueElement
          icon={<CharBeaIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.BEA}
        />
        <StatIconValueElement
          icon={<CharPerIcon className="w-10 h-10" />}
          value={0}
          label={Character.PRIMARY_STATS.PER}
        />
      </FlexRow>
    );
  };

  function HMData({ className }: { className?: string }) {
    const hmDataValues = Object.keys(Character.HM).map((key) => ({
      name: key,
      //value: selectedCharacter.hm
      //  ? selectedCharacter.hm[key as keyof typeof Character.HM]
      //  : 0,
      value: 0,
    }));

    return (
      <FlexRow className={className}>
        <StatIconValueElement
          icon={<CharHMATKIcon className="w-10 h-10" />}
          value={0}
          label={Character.HM.ATK}
        />
        <StatIconValueElement
          icon={<CharHMDEFIcon className="w-10 h-10" />}
          value={0}
          label={Character.HM.DEF}
        />
        <StatIconValueElement
          icon={<CharHMAIMIcon className="w-10 h-10" />}
          value={0}
          label={Character.HM.AIM}
        />
        <StatIconValueElement
          icon={<CharHMINIIcon className="w-10 h-10" />}
          value={0}
          label={Character.HM.INI}
        />
      </FlexRow>
    );
  }

  return (
    <FlexCol className="w-full bg-pink-500 sticky top-0 relative select-none">
      <XpBar />
      <FlexRow>
        <div
          className="absolute top-4 left-0 rounded-full bg-yellow-400 h-[100px] w-[100px]"
          onPointerDown={(e) => setShowRP((prev) => !prev)}
        ></div>
        <FlexCol
          className="grow ml-[105px] items-start justify-center"
          preventShrink={true}
        >
          <FlexRow>
            <p>{data.name}</p>
          </FlexRow>
          <FlexRow className="flex-wrap text-ellipsis" preventShrink={true}>
            <p className={`whitespace-normal`}>{data.lvl}-es szintű&nbsp;</p>
            <p className={`whitespace-normal`}>
              {data.descent} {data.class}
            </p>
          </FlexRow>
        </FlexCol>
        <ResourceBar />
      </FlexRow>
      <FlexRow preventShrink={true} className={`flex-wrap justify-between`}>
        <PrimaryStats className="z-10 grow" />
        <HMData className="z-10 grow justify-center" />
      </FlexRow>
      {showRP && <RPElement />}
    </FlexCol>
  );
}

function Bag({
  inventory,
  className,
}: {
  inventory: Character.Item.TInventory;
  className?: string;
}) {
  //v0.1: just make it work. Multiple selection like divs, displaying the name, amount and an x button to remove the item. At the bottom, there is a row an item name, a count and a "add new item" button
  return (
    <FlexCol className={className}>
      {Object.keys(inventory).map((key) => (
        <FlexRow>
          <div>{[key]}</div>
          {/*<div>{inventory[key as keyof typeof inventory]}</div>*/}
          <button>X</button>
        </FlexRow>
      ))}
      <FlexRow>
        <input type="text" />
        <input type="number" />
        <button>Add</button>
      </FlexRow>

      <FlexRow>
        <FlexCol>
          <InputUnq
            id="char-gold"
            label={Character.Item.MONEY.GOLD}
            value={0}
            onChange={() => {}}
            disabled={true}
          />
        </FlexCol>
        <FlexCol>
          <InputUnq
            id="char-silver"
            label={Character.Item.MONEY.SILVER}
            value={0}
            onChange={() => {}}
            disabled={true}
          />
        </FlexCol>
        <FlexCol>
          <InputUnq
            id="char-copper"
            label={Character.Item.MONEY.COPPER}
            value={0}
            onChange={() => {}}
            disabled={true}
          />
        </FlexCol>
      </FlexRow>
    </FlexCol>
  );
}
