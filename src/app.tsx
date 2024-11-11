import { useEffect, useRef, useState } from "preact/hooks";
import { transTime } from "./tec";
import ArrowLeftIcon from "./components/icons/general/ArrowLeftIcon";
import ArrowRightIcon from "./components/icons/general/ArrowRightIcon";
import { LoginForm } from "./pages/Login";
import Character from "./pages/Character/Character";
import { FlexRow } from "./components/Flex";
import { User } from "../../shared/shared_types";
import WindowsLayerProvider from "./pages/WindowsLayer";
import AdventureCharacterSelection from "./pages/AdventureCharacterSelection";
import Admin from "./pages/Admin/Admin";
import Spells from "./pages/Character/Spells";

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
    <div className={`bg-gray-300 flex justify-center items-center`}>
      <WindowsLayerProvider
        windows={
          [
            //{ jsx: Notes, name: "notes", icon: <>N</> },
            //{ jsx: Spells, name: "spells", icon: <>S</> },
          ]
        }
      >
        <div
          className={`transition-opacity duration-${transTime} ${
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
          <FlexRow className="justify-between bg-gray-300 w-screen relative items-stretch">
            <div
              className={`${
                pSt === PageState.LOGIN ? "opacity-70" : "opacity-100"
              } transition duration-${transTime} self-center `}
            >
              <button
                onClick={() => {
                  pSt !== 2
                    ? setTransitioning({
                        state: Visibility.HIDDEN,
                        direction: Change.DEC,
                      })
                    : confirm("Are you sure you logout?") &&
                      setPst(PageState.LOGIN);
                }}
                className={`w-[24px] h-[24px] text-gray-400 hover:text-black flex justify-center items-center focus:outline-none cursor-pointer transition duration-${transTime}`}
                disabled={pSt === (PageState.LOGIN || PageState.INIT)}
              >
                <ArrowLeftIcon className="w-[14px] h-[14px]" />
              </button>
            </div>
            <div
              id="page-container"
              class="flex justify-center items-stretch h-screen relative grow p-1 overflow-hidden"
            >
              {pageSelector()}
            </div>
            <div
              className={`${
                pSt === PageState.LOGIN ? "opacity-70" : "opacity-100"
              } transition duration-${transTime} self-center`}
            >
              <button
                onClick={() =>
                  setTransitioning({
                    state: Visibility.HIDDEN,
                    direction: Change.INC,
                  })
                }
                className={`w-[24px] h-[24px] text-gray-400 hover:text-black flex justify-center items-center focus:outline-none cursor-pointer transition duration-${transTime}`}
                disabled={
                  pSt === PageState.LOGIN ||
                  pSt === PageState.TEST ||
                  pSt === PageState.INIT
                }
              >
                <ArrowRightIcon className="w-[14px] h-[14px]" />
              </button>
            </div>
          </FlexRow>
        </div>
      </WindowsLayerProvider>
    </div>
  );
}
