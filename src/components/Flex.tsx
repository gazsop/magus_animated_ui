import { ComponentChildren } from "preact";
import { InputHTMLAttributes } from "preact/compat";

export function FlexRow(
  props: {
    children?: ComponentChildren;
    className?: string;
    preventShrink?: boolean;
  } & InputHTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={`${props.className ? `${props.className} ` : ""}${
        props.preventShrink ? "" : "shrink-0 "
      }flex flex-row`}
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
  } & InputHTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={`${props.className ? `${props.className} ` : ""}${
        props.preventShrink ? "" : "shrink-0 "
      }flex flex-col min-h-0`} // bg-[rgba(255,255,255,0.5)]
    >
      {props.children}
    </div>
  );
}
