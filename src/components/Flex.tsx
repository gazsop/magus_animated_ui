import { ComponentChildren } from "preact";
import { InputHTMLAttributes } from "preact/compat";

export function FlexRow(
  props: {
    children?: ComponentChildren;
    className?: string;
    preventShrink?: boolean;
    preventWrap?: boolean;
  } & InputHTMLAttributes<HTMLDivElement>
) {
  const shrink =
    typeof props.preventShrink === "undefined" ? false : props.preventShrink;
  const wrap =
    typeof props.preventWrap === "undefined" ? false : props.preventWrap;
  return (
    <div
      {...props}
      className={`${props.className ? `${props.className} ` : ""}${
        shrink ? "" : "shrink-0 "
      }${wrap ? "" : "flex-wrap "}flex flex-row min-w-0 min-h-0`}
    >
      {props.children}
    </div>
  );
}

export function FlexCol(
  props: {
    children?: ComponentChildren;
    className?: string;
    preventShrink?: boolean;
    preventWrap?: boolean;
  } & InputHTMLAttributes<HTMLDivElement>
) {
  const shrink =
    typeof props.preventShrink === "undefined" ? true : props.preventShrink;
  const wrap =
    typeof props.preventWrap === "undefined" ? true : !props.preventWrap;
  return (
    <div
      {...props}
      className={`${props.className ? `${props.className} ` : ""}${
        shrink ? "" : "shrink-0 "
      }${wrap ? "" : "flex-wrap "}flex flex-col min-h-0`} // bg-[rgba(255,255,255,0.5)]
    >
      {props.children}
    </div>
  );
}
