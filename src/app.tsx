import { useEffect, useRef, useState } from "preact/hooks";
import { transTime } from "./tec";
import { LoginForm } from "./pages/Login";
import Character from "./pages/Character/Character";
import { FlexCol, FlexRow } from "./components/Flex";
import { User } from "../../shared/shared_types";
import WindowsLayerProvider from "./pages/WindowsLayer";
import AdventureCharacterSelection from "./pages/AdventureCharacterSelection";
import Admin from "./pages/Admin/Admin";
import Spells from "./pages/Character/Spells";
import borderInnerCol from "/imgs/border_inner_column.png";
import ArrowLeftSelectionIcon from "./components/icons/general/ArrowLeftSelectionIcon";
import ArrowRightSelectionIcon from "./components/icons/general/ArrowRightSelectionIcon";
import { useUtilContext, UtilContextProvider } from "./utils/utilContext";

enum PageState {
  INIT,
  LOGIN,
  ADMIN,
  CHAR_SELECTION,
  CHAR_SHEET,
  STORYBOOK,
  YNEV,
  TEST,
}

const PST_LENGTH = Object.keys(PageState).length / 2;

export enum Change {
  INC,
  DEC,
  STILL,
}

enum Visibility {
  DISPLAY,
  HIDDEN,
}

export default function App() {
  const [pSt, setPst] = useState(PageState.CHAR_SELECTION);
  const [transitioning, setTransitioning] = useState<{
    state: Visibility;
    direction: Change;
  }>({
    state: Visibility.DISPLAY,
    direction: Change.INC,
  });

  const [user, setUser] = useState<{
    uid: string;
    rank: User.USER_RANK;
  }>({ uid: "", rank: User.USER_RANK.UNAUTH });

  //const [height, setHeight] = useState(window.innerHeight);
  //const [view, setView] = useState<"sm" | "md" | "lg">(
  //  window.innerWidth < 768 ? "sm" : window.innerWidth < 1024 ? "md" : "lg"
  //);
  //const [backgroundOffsetY, setOffsetY] = useState(0);
  //const [backgroundOffsetX, setOffsetX] = useState(0);

  const selectedAdvIdRef = useRef("");

  useEffect(() => {
    const preloadIframe = document.createElement("iframe");
    const container = document.getElementById("page-container");
    //preloadIframe.src = "https://kalandozok.hu/ynev/?#1/6418/10000";
    preloadIframe.className = `grow hidden`;
    preloadIframe.id = "ynevMapIframe";
    preloadIframe.onload = () => {
      console.log("Ynev loaded");
    };
    if (container) container.appendChild(preloadIframe);
    return () => {
      if (container) container.removeChild(preloadIframe);
    };
  }, []);

  useEffect(() => {
    const preloadIframe = document.createElement("iframe");
    const container = document.getElementById("page-container");
    //preloadIframe.src = "/torvenykonyv.pdf";
    preloadIframe.className = `grow hidden`;
    preloadIframe.id = "storybookIframe";
    preloadIframe.onload = () => {
      console.log("SB loaded");
    };
    if (container) container.appendChild(preloadIframe);
    return () => {
      if (container) container.removeChild(preloadIframe);
    };
  }, []);

  useEffect(() => {
    if (selectedAdvIdRef.current) updatePSt(Change.INC);
  }, [selectedAdvIdRef.current]);

  const updatePSt = (change: Change) => {
    setTransitioning({
      state: Visibility.HIDDEN,
      direction: change,
    });
  };

  const pageSelector = () => {
    console.log("Page State", PageState[pSt]);
    if (pSt !== PageState.YNEV) {
      const iframe = document.getElementById("ynevMapIframe");
      if (iframe && !iframe.classList.contains("hidden")) {
        iframe.classList.add("hidden");
      }
    }
    if (pSt !== PageState.STORYBOOK) {
      const iframe = document.getElementById("storybookIframe");
      if (iframe && !iframe.classList.contains("hidden")) {
        iframe.classList.add("hidden");
      }
    }

    const authorized = (page: string) => true;
    const login = ({ uid, pwd }: { uid: string; pwd: string }) => {
      updatePSt(Change.INC);
    };

    switch (pSt) {
      case PageState.CHAR_SELECTION: {
        if (!authorized("CHAR_SELECTION")) break;
        return (
          <AdventureCharacterSelection
            selectCharacter={(char: string) => {
              selectedAdvIdRef.current = char;
              updatePSt(Change.INC);
            }}
          />
        );
      }
      case PageState.CHAR_SHEET: {
        if (!authorized("CHAR_SHEET")) break;
        return <Character advId={selectedAdvIdRef.current} />;
      }
      case PageState.YNEV: {
        if (!authorized("YNEV")) break;
        const iframe = document.getElementById("ynevMapIframe");
        if (iframe && iframe.classList.contains("hidden"))
          iframe.classList.remove("hidden");
        return;
      }
      case PageState.STORYBOOK: {
        if (!authorized("STORYBOOK")) break;
        const iframe = document.getElementById("storybookIframe");
        if (iframe && iframe.classList.contains("hidden"))
          iframe.classList.remove("hidden");
        return;
      }
      case PageState.ADMIN:
        return <Admin />;
    }
    return <LoginForm login={login} />;
  };

  useEffect(() => {
    console.log("Page State", PageState[pSt]);
  }, [pSt]);

  return (
    <div
      className={`flex justify-center items-stretch w-screen`}
      style={{
        backgroundImage: `url(/imgs/bg_parchment_4.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        //padding: `${backgroundOffsetY + 10}px ${backgroundOffsetX + 10}px`,
        height: `100vh`,
      }}
    >
      <UtilContextProvider>
        <WindowsLayerProvider
          windows={
            [
              //{ jsx: Notes, name: "notes", icon: <>N</> },
              //{ jsx: Spells, name: "spells", icon: <>S</> },
            ]
          }
        >
          <div
            className={`${
              pSt === PageState.LOGIN ? "opacity-70" : "opacity-100"
            } transition duration-${transTime} self-center absolute left-0 top-1/2`}
            style={{
              zIndex: "var(--layer-arrows)",
            }}
          >
            <div
              onClick={() => {
                pSt !== 2
                  ? setTransitioning({
                      state: Visibility.HIDDEN,
                      direction: Change.DEC,
                    })
                  : confirm("Are you sure you logout?") &&
                    setPst(PageState.LOGIN);
              }}
              className={`text-gray-400 hover:text-black flex justify-center items-center focus:outline-none cursor-pointer transition duration-${transTime}
						${
              (pSt === PageState.LOGIN ||
                pSt === PageState.TEST ||
                pSt === PageState.INIT) &&
              "user-select-none pointer-events-none"
            }`}
            >
              <ArrowLeftSelectionIcon className="w-[12px]" />
            </div>
          </div>
          <FlexCol
            className={`relative grow transition-opacity duration-${transTime} ${
              Visibility[transitioning.state] === "HIDDEN"
                ? "opacity-0"
                : "opacity-100"
            }`}
            onTransitionEnd={() => {
              if (transitioning.state === Visibility.HIDDEN) {
                setPst((prev) =>
                  transitioning.direction === Change.INC
                    ? prev + ((pSt === PageState.INIT ? 2 : 1) % PST_LENGTH)
                    : (prev - 1) % PST_LENGTH
                );
                setTransitioning({
                  state: Visibility.DISPLAY,
                  direction: Change.STILL,
                });
              }
            }}
          >
            <div
              id="page-container"
              className="flex justify-center items-stretch grow relative overflow-hidden"
              style={{ zIndex: "var(--layer-bg)" }}
            >
              {pageSelector()}
            </div>
          </FlexCol>
          <div
            className={`${
              pSt === PageState.LOGIN ? "opacity-70" : "opacity-100"
            } transition duration-${transTime} self-center absolute right-0 top-1/2`}
            style={{
              zIndex: "var(--layer-arrows)",
            }}
          >
            <div
              onClick={() =>
                setTransitioning({
                  state: Visibility.HIDDEN,
                  direction: Change.INC,
                })
              }
              className={`text-gray-400 hover:text-black flex justify-center items-center focus:outline-none cursor-pointer transition duration-${transTime}${
                (pSt === PageState.LOGIN ||
                  pSt === PageState.TEST ||
                  pSt === PageState.INIT) &&
                "user-select-none pointer-events-none"
              }`}
            >
              <ArrowRightSelectionIcon className="w-[12px]" />
            </div>
          </div>
        </WindowsLayerProvider>
        <BackgroundDeco />
      </UtilContextProvider>
    </div>
  );
}

function BackgroundDeco() {
  const [borderWidth, setBorderWidth] = useState(0);
  const [cornerDecoWidth, setCornerDecoWidth] = useState(0);

  const {
    view,
    windowHeight,
    windowWidth,
    backgroundOffsetX,
    backgroundOffsetY,
  } = useUtilContext();
  return (
    <div
      className={`user-select-none pointer-events-none absolute top-0 left-0 w-screen`}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          height: windowHeight,
          width: backgroundOffsetX,
          backgroundColor: "rgba(123, 69, 0, 0.24)",
        }}
      />
      <div
        className="absolute top-0 right-0"
        style={{
          height: windowHeight,
          width: backgroundOffsetX,
          backgroundColor: "rgba(123, 69, 0, 0.24)",
        }}
      />
      <div
        className="absolute top-0"
        style={{
          height: backgroundOffsetY,
          width: windowWidth - 2 * backgroundOffsetX,
          left: backgroundOffsetX,
          backgroundColor: "rgba(123, 69, 0, 0.24)",
        }}
      />
      <div
        className="absolute"
        style={{
          height: backgroundOffsetY,
          width: windowWidth - 2 * backgroundOffsetX,
          top: windowHeight - backgroundOffsetY,
          left: backgroundOffsetX,
          backgroundColor: "rgba(123, 69, 0, 0.24)",
        }}
      />
      <img
        src={
          view === "sm"
            ? "/imgs/border_deco_corner_m.png"
            : "/imgs/border_deco_corner.png"
        }
        className={`absolute top-0 right-0 pointer-events-none`}
        style={{ zIndex: 10, width: cornerDecoWidth }}
      />
      <img
        src={
          view === "sm"
            ? "/imgs/border_deco_corner_m.png"
            : "/imgs/border_deco_corner.png"
        }
        className={`${
          view === "sm" ? "rotate-180 " : "-rotate-90 "
        }absolute top-0 left-0 select-none pointer-events-none`}
        style={{ zIndex: 10, width: cornerDecoWidth }}
      />
      <img
        src={
          view === "sm"
            ? "/imgs/border_deco_corner_m.png"
            : "/imgs/border_deco_corner.png"
        }
        className={`absolute left-0 select-none rotate-180 pointer-events-none`}
        style={{
          zIndex: 10,
          width: cornerDecoWidth,
          top:
            view === "sm"
              ? windowHeight - cornerDecoWidth / 2 - 2
              : windowHeight - cornerDecoWidth,
        }}
      />
      <img
        src={
          view === "sm"
            ? "/imgs/border_deco_corner_m.png"
            : "/imgs/border_deco_corner.png"
        }
        className={`${
          view === "sm" ? "" : "rotate-90 "
        }absolute right-0 select-none pointer-events-none`}
        style={{
          zIndex: 10,
          width: cornerDecoWidth,
          top:
            view === "sm"
              ? windowHeight - cornerDecoWidth / 2 - 2
              : windowHeight - cornerDecoWidth,
        }}
      />
      <img
        src={borderInnerCol}
        className="absolute pointer-events-none"
        style={{
          zIndex: 9,
          height: `${windowHeight - 2 * backgroundOffsetY}px`,
          top: backgroundOffsetY,
          right: backgroundOffsetX,
          width: borderWidth,
        }}
      />
      <img
        src={borderInnerCol}
        className="absolute pointer-events-none"
        style={{
          zIndex: 9,
          height: `${windowHeight - 2 * backgroundOffsetY}px`,
          width: borderWidth,
          left: backgroundOffsetX,
          top: backgroundOffsetY,
        }}
      />
      <img
        src={borderInnerCol}
        className="absolute origin-top-right -rotate-90 pointer-events-none"
        style={{
          zIndex: 9,
          height: `calc(100vw - ${
            view === "sm"
              ? 2 * (backgroundOffsetY + borderWidth)
              : 2 * backgroundOffsetY
          }px)`,
          top: backgroundOffsetY,
          left: backgroundOffsetY,
          width: borderWidth,
        }}
      />
      <img
        src={borderInnerCol}
        className="absolute origin-bottom-right rotate-90 pointer-events-none"
        style={{
          zIndex: 9,
          height: `calc(100vw - ${
            view === "sm"
              ? 2 * (backgroundOffsetY + borderWidth)
              : 2 * backgroundOffsetY
          }px)`,
          width: borderWidth,
          bottom: -1 * (windowHeight - backgroundOffsetY),
          left: backgroundOffsetY,
        }}
      />
    </div>
  );
}
