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
import CharCoindBronze from "../../components/icons/magus/CharCoinBronze.svg";
import CharCoinSilver from "../../components/icons/magus/CharCoinSilver.svg";
import CharCoinGold from "../../components/icons/magus/CharCoinGold.svg";

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
    <FlexCol className="justify-center items-start grow">
      <Header
        name={selectedCharacter.rp ? selectedCharacter.rp.name : "János"}
        descent={selectedCharacter.descent || Character.DESCENTS.HUMAN}
        class={selectedCharacter.class || Character.CLASSES.WARRIOR}
        lvl={selectedCharacter.level ? selectedCharacter.level.current : 1}
      />
      <Bag inventory={inventoryDummy()} className="max-h-40 m-2" />
    </FlexCol>
  );
  //<SecondaryStats className="max-h-80 m-2" />;
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
      allowShrink={true}
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
      <div className="flex items center justify-between bg-gray-300 relative grow mb-1">
        <div
          className="w-full bg-gray-500"
          ref={xpBar}
          onPointerDown={(e) => setShowText((prev) => !prev)}
          onTouchStart={(e) => setShowText((prev) => !prev)}
          onClick={(e) => console.log(e)}
        >
          <div className="h-4 bg-blue-500" ref={xpBarFill}></div>
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
        <VerticalBar
          val={healthData.currentHp}
          max={healthData.maxHp}
          color="rgb(186, 96, 0)"
        />
        <VerticalBar
          val={healthData.currentEp}
          max={healthData.maxEp}
          color="rgb(133, 18, 0)"
        />
        <VerticalBar
          val={healthData.currentMana}
          max={healthData.mana}
          color="rgb(9, 0, 133)"
        />
      </FlexRow>
    );

    function VerticalBar({
      val,
      max,
      color,
    }: {
      val: number;
      max: number;
      color: string;
    }) {
      const percentage = Math.min((val / max) * 100, 100); // Ensure it doesn't exceed 100%

      return (
        <div className="relative h-10 w-3 rounded overflow-hidden fancy-container m-1">
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{ height: `${percentage}%`, backgroundColor: color }}
          ></div>
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
      <FlexCol className={`overflow-auto max-h-80`}>
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
    return (
      <FlexRow
        className={`${className ? className + " " : ""}`}
        allowShrink={true}
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
    <FlexCol
      className="relative select-none fancy-container m-1"
      style={{
        width: "calc(100% - .5rem)",
      }}
    >
      <XpBar />
      <FlexRow allowShrink={false}>
        <div
          className="absolute top-4 left-0 rounded-full bg-yellow-400 h-[100px] w-[100px]"
          onPointerDown={(e) => setShowRP((prev) => !prev)}
        ></div>
        <FlexCol
          className="ml-[105px] items-start justify-center fancy-container"
          allowShrink={true}
        >
          <FlexRow>
            <p>{data.name}</p>
          </FlexRow>
          <FlexRow className="text-ellipsis">
            <p className={`whitespace-normal`}>{data.lvl}-es szintű&nbsp;</p>
            <p className={`whitespace-normal`}>
              {data.descent} {data.class}
            </p>
          </FlexRow>
        </FlexCol>
        <FlexCol className={`grow`} />
        <ResourceBar />
      </FlexRow>
      <FlexRow className={`justify-between`}>
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
    <FlexCol
      className={`${className ? className + " " : ""}`}
      style={{
        width: "calc(100% - .5rem)",
      }}
    >
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

      <FlexRow className={`fancy-container`}>
        <FlexRow className={`items-center justify-center`}>
          <img src={CharCoinGold} alt="" className="w-6 h-6" />
          {0}
        </FlexRow>
        <FlexRow className={`items-center justify-center`}>
          <img src={CharCoinSilver} alt="" className="w-6 h-6" />
          {0}
        </FlexRow>
        <FlexRow className={`items-center justify-center`}>
          <img src={CharCoindBronze} alt="" className="w-6 h-6" />
          <p className={`p-1`}>{0}</p>
        </FlexRow>
      </FlexRow>
    </FlexCol>
  );
}
