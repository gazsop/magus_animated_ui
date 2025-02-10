import {
  createContext,
  JSX,
  useContext,
  useEffect,
  useState,
} from "preact/compat";

interface IUtil {
  view: "sm" | "md" | "lg";
  windowHeight: number;
  windowWidth: number;
  backgroundOffsetY: number;
  backgroundOffsetX: number;
}

const UtilContext = createContext<IUtil>({
  view: "md",
  windowHeight: 0,
  windowWidth: 0,
  backgroundOffsetY: 0,
  backgroundOffsetX: 0,
});

export function UtilContextProvider(props: {
  children: JSX.Element | JSX.Element[];
}) {
  const [view, setView] = useState<"sm" | "md" | "lg">("md");
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [backgroundOffsetY, setBackgroundOffsetY] = useState<number>(0);
  const [backgroundOffsetX, setBackgroundOffsetX] = useState<number>(0);

  useEffect(() => {
    const resizeHeightListener = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeHeightListener);
    return () =>
      window.removeEventListener("resize", () => resizeHeightListener);
  }, []);

  useEffect(() => {
    const resizeWidthListener = () => {
      if (window.innerWidth < 768) {
        setView("sm");
        setBackgroundOffsetY(11);
        setBackgroundOffsetX(0);
      } else {
        setView("lg");
        setBackgroundOffsetY(10);
        setBackgroundOffsetX(10);
      }
      if (window.innerWidth !== windowWidth) {
        setWindowWidth(window.innerWidth);
      }
    };

    resizeWidthListener();
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", resizeWidthListener);
      return () => {
        window.visualViewport &&
          window.visualViewport.removeEventListener(
            "resize",
            resizeWidthListener
          );
      };
    }
  }, []);

  return (
    <UtilContext.Provider
      value={{
        view,
        windowHeight,
        windowWidth,
        backgroundOffsetY,
        backgroundOffsetX,
      }}
    >
      {props.children}
    </UtilContext.Provider>
  );
}

export function useUtilContext() {
  return useContext(UtilContext);
}
