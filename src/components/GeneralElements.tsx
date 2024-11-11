import { ComponentChildren } from "preact";
import Select, { GroupBase, MultiValue, SingleValue } from "react-select";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  InsertImage,
  MDXEditor,
  MDXEditorMethods,
  Separator,
  UndoRedo,
  headingsPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef } from "preact/hooks";
import { FlexCol, FlexRow } from "./Flex";
import { InputHTMLAttributes } from "preact/compat";

export type HTMLOptionData<T> = {
  label: string;
  value: T;
};

export function SelectUnq<
  T,
  K extends
    | MultiValue<HTMLOptionData<T>>
    | SingleValue<HTMLOptionData<T>> = SingleValue<HTMLOptionData<T>>
>({
  id,
  optionData,
  label,
  value,
  onChange,
  className,
  disabled = false,
  widthOverride,
  layout = "flex-row",
  multiple = false,
}: {
  id: string;
  optionData: HTMLOptionData<T>[];
  label: string;
  value: HTMLOptionData<T> | HTMLOptionData<T>[];
  onChange: (e: K) => void;
  className?: string;
  disabled?: boolean;
  widthOverride?: string;
  layout?: "flex-row" | "flex-col";
  multiple?: boolean;
}) {
  const LayoutSelector = (props: { children: ComponentChildren }) => {
    if (layout === "flex-row")
      return (
        <FlexRow
          className={`${className ? className + " " : ""}justify-stretch`}
        >
          {props.children}
        </FlexRow>
      );
    else
      return (
        <FlexCol
          className={`${className ? className + " " : ""}justify-stretch`}
        >
          {props.children}
        </FlexCol>
      );
  };

  const getValue = (val: HTMLOptionData<T> | HTMLOptionData<T>[]) => {
    if (Array.isArray(val) && val.length > 0) {
      return val[0].label ? val : [];
    } else {
      const newVal = val as HTMLOptionData<T>;
      return newVal.label
        ? val
        : { label: "Válassz", value: "0" as unknown as T };
    }
  };

  return (
    <LayoutSelector>
      <div className="flex justify-start items-center p-1 grow">
        <label for={`${id}`} className="">
          {label}
        </label>
      </div>
      <Select<HTMLOptionData<T>, boolean, GroupBase<HTMLOptionData<T>>>
        id={`${id}`}
        className={`p-1 ${widthOverride ? widthOverride : " w-40 lg:w-60"}${
          multiple ? " multiple" : " single"
        }`}
        options={optionData}
        value={getValue(value) as K}
        onChange={(e, actionMeta) => {
          console.log(e);
          if (!e) return;
          const data = e as K;
          onChange(data);
        }}
        key={id}
        menuPortalTarget={document.body}
        isDisabled={disabled || false}
        isMulti={multiple}
        menuPlacement="auto"
      />
    </LayoutSelector>
  );
}

export function CheckboxUnq({
  id,
  label,
  value,
  onChange,
  className,
  disabled = false,
  layout = "flex-row",
  widthOverride,
}: {
  id: string;
  label: string;
  value: boolean;
  onChange: (e: Event) => void;
  className?: string;
  disabled?: boolean;
  layout?: "flex-row" | "flex-col";
  widthOverride?: string;
}) {
  const LayoutSelector = (props: { children: ComponentChildren }) => {
    if (layout === "flex-row")
      return (
        <FlexRow
          className={`${className ? className + " " : ""}justify-stretch ${
            widthOverride ? widthOverride : "w-32 lg:w-32"
          }`}
        >
          {props.children}
        </FlexRow>
      );
    else
      return (
        <FlexCol
          className={`${className ? className + " " : ""}justify-stretch ${
            widthOverride ? widthOverride : "w-32 lg:w-32"
          }`}
        >
          {props.children}
        </FlexCol>
      );
  };
  return (
    <LayoutSelector>
      <div className="flex justify-start items-center p-1 grow">
        <label for={`${id}`} className="">
          {label}
        </label>
      </div>
      <input
        id={`${id}`}
        key={`${id}`}
        className={`p-1`}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e)}
        disabled={disabled || false}
      />
    </LayoutSelector>
  );
}

export function InputUnq<T extends number | string>({
  label,
  value,
  widthOverride,
  id,
  layout = "flex-row",
  svgIcon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: T;
  layout?: "flex-row" | "flex-col";
  widthOverride?: string;
  id: string;
  svgIcon?: JSX.Element;
}) {
  const { onChange, onBlur, className, disabled, placeholder, type } = props;
  const LayoutSelector = (props: { children: ComponentChildren }) => {
    if (layout === "flex-row")
      return (
        <FlexRow
          className={`${className ? className + " " : ""}justify-stretch`}
        >
          {props.children}
        </FlexRow>
      );
    else
      return (
        <FlexCol
          className={`${className ? className + " " : ""}justify-stretch`}
        >
          {props.children}
        </FlexCol>
      );
  };
  return (
    <LayoutSelector>
      <div className="flex justify-start items-center p-1 grow">
        {svgIcon}
        <label for={`${id}`} className="grow">
          {label}
        </label>
      </div>
      <input
        {...props}
        id={`${id}`}
        key={`${id}`}
        className={`p-1 ${widthOverride ? widthOverride : "w-40 lg:w-60"}`}
        type={typeof value === "number" ? "number" : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled || false}
        placeholder={placeholder}
      />
    </LayoutSelector>
  );
}

export function TextAreaUnq({
  id,
  label,
  value,
  onChange,
  onSave,
  onBlur,
  className,
  disabled,
  placeholder,
  layout = "flex-col",
  element = "textarea",
}: {
  id: string;
  label?: string;
  value: string;
  onChange?: (msg: string) => void;
  onSave?: (msg: string) => void;
  onBlur?: (e: FocusEvent) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  layout?: "flex-col" | "flex-row";
  element?: "textarea" | "editor";
}) {
  const TextAreaElement = () => {
    if ((element && element) === "editor") {
      const elementRef = useRef<MDXEditorMethods>(null);
      const Save = () => {
        if (!onSave) return null;
        console.log("Save");
        return (
          <button
            onClick={() => {
              console.log(elementRef.current?.getMarkdown());
              const markdown = elementRef.current?.getMarkdown() || "";
              onSave(markdown);
              if (
                onSave &&
                typeof onSave === "function" &&
                typeof markdown === "string"
              ) {
                onSave(markdown);
              }
            }}
            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        );
      };
      return (
        <MDXEditor
          key={id}
          ref={elementRef}
          markdown={value}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <BlockTypeSelect />
                  <Separator />
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <InsertImage />
                  <Save />
                </>
              ),
            }),
            headingsPlugin(),
          ]}
          className={`p-1 grow shrink-0`}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e)}
          onBlur={(e) => onBlur && onBlur(e)}
        />
      );
    }
    return (
      <textarea
        id={`${id}-textarea`}
        key={`${id}-textarea`}
        className={`p-1 shrink-0 grow`}
        value={value}
        onChange={(e) => {
          const target = e.target as HTMLTextAreaElement;
          const value = target.value;
          if (onChange && typeof onChange === "function" && value)
            onChange(value);
        }}
        disabled={disabled || false}
        placeholder={placeholder}
      />
    );
  };
  const LabelElement = (
    <div className="flex justify-start items-center p-1">
      <label for={`${id}-textarea`} className="grow">
        {label}
      </label>
    </div>
  );

  if (layout === "flex-row") {
    return (
      <FlexRow className={`${className ? className + " " : ""}shrink-0`}>
        {label && LabelElement}
        <TextAreaElement />
      </FlexRow>
    );
  }
  return (
    <FlexCol className={`${className ? className + " " : ""}shrink-0`}>
      {LabelElement}
      <TextAreaElement />
    </FlexCol>
  );
}

export function ButtonUnq({
  id,
  onClick,
  className,
  disabled = false,
  layout = "flex-row",
  children,
}: {
  id: string;
  onClick: (e: Event) => void;
  className?: string;
  disabled?: boolean;
  layout?: "flex-row" | "flex-col";
  children: ComponentChildren;
}) {
  const ButtonElement = (
    <button
      className={`p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled || false}
      id={id}
    >
      {children}
    </button>
  );

  if (layout === "flex-row") {
    return <FlexRow className="shrink-0">{ButtonElement}</FlexRow>;
  }
  return <FlexCol className="shrink-0">{ButtonElement}</FlexCol>;
}
