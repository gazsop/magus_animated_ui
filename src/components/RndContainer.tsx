import { useState } from "preact/hooks";
import useLocalStorage from "../hooks/localStorageHandler";
import { DraggableData, Rnd, RndDragEvent } from "react-rnd";
import { FlexRow, FlexCol } from "./Flex";
import RefreshCwIcon from "./icons/general/RefreshCwIcon";
import MoveIcon from "./icons/general/MoveIcon";
import MaximizeIcon from "./icons/general/MaximizeIcon";
import XIcon from "./icons/general/XIcon";
import FancyWindow from "./FancyWindow";

const yOff = 5;
const xOff = 24;
function RndContainer({
  id,
  aditionalIcons,
  close,
  label,
  children,
  onDragStart,
  className,
}: {
  id: string;
  aditionalIcons: JSX.Element | null;
  close: () => void;
  label: string;
  children: JSX.Element | JSX.Element[];
  onDragStart?: (e: RndDragEvent) => void;
  className?: string;
}) {
  const [onDragState, setOnDragState] = useState(false);
  const [resizeable, setResizeable] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - 2 * xOff,
    height: window.innerHeight - 2 * yOff,
  });
  const [windowPosition, setWindowPosition] = useState({ x: xOff, y: yOff });

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <Rnd
        id={id}
        size={{ width: windowSize.width, height: windowSize.height }}
        position={{ x: windowPosition.x, y: windowPosition.y }}
        onDragStart={(e: RndDragEvent, data: DraggableData) => {
          if (e && onDragStart) onDragStart(e);
          if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            const target = e.target as HTMLElement;
            if (target.closest(".move") && onDragState) {
              setOnDragState(false);
              e.preventDefault();
              e.stopPropagation();
            }
          }
        }}
        onDragStop={(e: MouseEvent | TouchEvent, d: DraggableData) => {
          console.log("onDragStop");
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          let x = d.x;
          let y = d.y;
          if (d.x < xOff) x = xOff;
          if (d.y < yOff) y = yOff;
          if (x + windowSize.width > windowWidth - xOff)
            x = windowWidth - windowSize.width - xOff;
          if (y + windowSize.height > windowHeight - 2 * yOff)
            y = windowHeight - windowSize.height - yOff;

          setWindowPosition({ x: x, y: y });
        }}
        onResizeStop={(
          e: MouseEvent | TouchEvent,
          _: any,
          ref: HTMLElement,
          __: any,
          position: { x: number; y: number }
        ) => {
          let width = parseInt(ref.style.width);
          let height = parseInt(ref.style.height);
          let x = position.x;
          let y = position.y;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          if (x < xOff) x = xOff;
          if (y < yOff) y = yOff;
          if (height + y > windowHeight - 2 * yOff) {
            height = windowHeight - 2 * yOff;
            y = yOff;
          }
          if (width + x > windowWidth - 2 * xOff) {
            width = windowWidth - 2 * xOff;
            x = xOff;
          }

          if (width < 200) width = 200;
          if (height < 200) height = 200;
          setWindowSize({
            width: width,
            height: height,
          });
          setWindowPosition({
            x: x,
            y: y,
          });
        }}
        className={`${
          className ? className + " " : ""
        }flex flex-col border border-black pointer-events-auto`}
        disableDragging={!onDragState}
        enableResizing={resizeable}
        resizeGrid={[20, 20]}
        dragGrid={[20, 20]}
        style={{
          zIndex: "var(--layer-window)",
        }}
      >
        <FancyWindow height={windowSize.height} width={windowSize.width}>
          <FlexRow
            className="fixed right-3 h-3 w-max justify-between items-center cursor-default select-none"
            style={{
              zIndex: "var(--layer-window-header)",
            }}
          >
            <FlexRow className={`fancy-container`}>
              {aditionalIcons}
              <RefreshCwIcon
                className="h-4 m-1 w-6 cursor-pointer"
                onClick={() => {
                  setOnDragState(true);
                  setResizeable(false);
                  setWindowPosition({ x: 0, y: yOff });
                  setWindowSize({ width: 200, height: 200 });
                }}
              />
              <MoveIcon
                className={`relative h-4 m-1 w-6 cursor-pointer ${
                  onDragState ? "text-white" : "text-black"
                }`}
                onClick={() => {
                  console.log("asd");
                  setOnDragState((prev) => !prev);
                }}
              />
              <MaximizeIcon
                className={`h-4 m-1 w-6 cursor-pointer ${
                  resizeable ? "text-white" : "text-drag"
                }`}
                onClick={() => setResizeable((prev) => !prev)}
              />
              <XIcon className="h-4 m-1 w-6 cursor-pointer" onClick={close} />
            </FlexRow>
          </FlexRow>
          <FlexRow
            className="h-[calc(100%-1.5rem)] overflow-auto grow"
            style={{
              zIndex: "var(--layer-window-content)",
            }}
          >
            <FlexCol className={`fancy-container w-full p-2`}>
              <p>{label}</p>
              {children}
            </FlexCol>
            {onDragState && (
              <div
                id="invisible-layer"
                className={`absolute top-[1.5rem] left-0 w-full h-[calc(100%-1.5rem)] bg-transparent grow`}
              ></div>
            )}
          </FlexRow>
        </FancyWindow>
      </Rnd>
    </div>
  );
}

export default RndContainer;
