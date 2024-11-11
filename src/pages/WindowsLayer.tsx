import { createContext, useContext, useEffect, useState } from "react";
import { FlexCol, FlexRow } from "../components/Flex";
import { JSXInternal } from "preact/src/jsx";

export interface IWindowsLayerWindowProps {
  jsx: (props: {
    close: () => void;
    isOpen: boolean;
    selectWindow: () => void;
    classes?: string;
  }) => JSXInternal.Element;
  name: string;
  icon: JSXInternal.Element;
}

interface IWindowsLayer {
  addWindow: (window: IWindowsLayerWindowProps) => void;
  removeWindow: (windowName: string) => void;
  updateWindow: (windowName: string, window: IWindowsLayerWindowProps) => void;
}

const WindowsLayerContext = createContext<IWindowsLayer>({
  addWindow: () => {},
  removeWindow: () => {},
  updateWindow: () => {},
});

export const WindowsLayerProvider = (props: {
  children: JSX.Element;
  windows?: IWindowsLayerWindowProps[];
}) => {
  const [windows, setWindows] = useState<IWindowsLayerWindowProps[]>(
    props.windows || []
  );
  const [selectedWindow, setSelectedWindow] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean[]>(
    windows && Array.isArray(windows) ? windows.map(() => false) : []
  );

  const addWindow = (window: {
    jsx: ({
      close,
      isOpen,
      selectWindow,
      classes,
    }: {
      close: () => void;
      isOpen: boolean;
      selectWindow: () => void;
      classes?: string;
    }) => JSXInternal.Element;
    name: string;
    icon: JSXInternal.Element;
  }) => {
    console.log("addWindow", window);
    setIsOpen((prev) => {
      return [...prev, false];
    });
    setWindows((prev) => {
      return [...prev, window];
    });
  };

  const removeWindow = (windowName: string) => {
    const windowIndex = windows.findIndex(
      (window) => window.name === windowName
    );
    if (windowIndex < 2) return;
    setWindows((prev) => {
      const newPrev = [...prev];
      newPrev.splice(windowIndex, 1);
      return newPrev;
    });
    setIsOpen((prev) => {
      const newPrev = [...prev];
      newPrev.splice(windowIndex, 1);
      return newPrev;
    });
  };

  const updateWindow = (
    windowName: string,
    window: IWindowsLayerWindowProps
  ) => {
    const windowIndex = windows.findIndex(
      (window) => window.name === windowName
    );
    console.log("updateWindow", windowIndex, windowName, window);
    if (windowIndex < 2) return;
    setWindows((prev) => {
      const newPrev = [...prev];
      newPrev[windowIndex] = window;
      return newPrev;
    });
  };

  const Windows = () => {
    return (
      <>
        {windows &&
          Array.isArray(windows) &&
          windows.map((window, index) => {
            const WindowComponent = window.jsx;
            return (
              <WindowComponent
                close={() => {
                  console.log("close");
                  setIsOpen((prev) => {
                    console.log("prev", prev);
                    const newPrev = [...prev];
                    newPrev[index] = false;
                    return newPrev;
                  });
                  removeWindow(window.name);
                }}
                isOpen={isOpen[index]}
                selectWindow={() => {
                  if (selectedWindow !== window.name) {
                    console.log("selectWindow", selectedWindow);
                    console.log("window.name", window.name);
                    console.log("index", index);
                    setSelectedWindow(window.name);
                  }
                }}
                classes={selectedWindow === window.name ? "z-50" : "z-10"}
              />
            );
          })}
      </>
    );
  };

  const WindowsLayer = () => {
    return (
      <>
        <Windows />
        <FlexCol className="fixed bottom-[10vh] -right-12 bg-transparent">
          {windows &&
            Array.isArray(windows) &&
            windows.map((window, index) => {
              return (
                <FlexRow
                  className={`rounded-full h-10 w-20 m-0.5 cursor-pointer items-center pl-2 border-2 border-black`}
                  onClick={() => {
                    console.log("click");
                    setIsOpen((prev) => {
                      console.log("selectedWindow", selectedWindow);
                      if (!selectedWindow) setSelectedWindow(window.name);
                      console.log("prev", prev);
                      const newPrev = [...prev];
                      newPrev[index] = !newPrev[index];
                      return newPrev;
                    });
                  }}
                >
                  {window.icon && window.icon}
                </FlexRow>
              );
            })}
        </FlexCol>
      </>
    );
  };

  return (
    <WindowsLayerContext.Provider
      value={{ addWindow, removeWindow, updateWindow }}
    >
      {props.children}
      <WindowsLayer />
    </WindowsLayerContext.Provider>
  );
};

export const useWindowsLayer = () => {
  return useContext(WindowsLayerContext);
};

export default WindowsLayerProvider;
