import { ComponentChildren } from "preact";
import { InputHTMLAttributes } from "preact/compat";

export function FlexRow(
  props: {
    children?: ComponentChildren;
    className?: string;
    allowShrink?: boolean;
    preventWrap?: boolean;
  } & InputHTMLAttributes<HTMLDivElement>
) {
  const shrink =
    typeof props.allowShrink === "undefined" ? true : props.allowShrink;
  return (
    <div
      {...props}
      className={`${props.className ? `${props.className} ` : ""}${
        shrink ? "" : "shrink-0 "
      }${
        props.preventWrap ? "" : "flex-wrap "
      }flex flex-row flex-wrap min-w-0 min-h-0`}
    >
      {props.children}
    </div>
  );
}

export function FlexCol(
  props: {
    children?: ComponentChildren;
    className?: string;
    allowShrink?: boolean;
    preventWrap?: boolean;
  } & InputHTMLAttributes<HTMLDivElement>
) {
  const shrink =
    typeof props.allowShrink === "undefined" ? true : props.allowShrink;
  return (
    <div
      {...props}
      className={`${props.className ? `${props.className} ` : ""}${
        shrink ? "" : "shrink-0 "
      }${props.preventWrap ? "" : "flex-wrap "}flex flex-col min-h-0`} // bg-[rgba(255,255,255,0.5)]
    >
      {props.children}
    </div>
  );
}
