import { createRef, LegacyRef, useEffect, useRef, useState } from "react";
import { linkedList } from "./linkedList";
import "../assets/slideshow.css";
import React from "react";

type TSlideshowProps = {
  data: linkedList<ICard>;
  layout?: "advanture";
};

export interface ICard {
  header: string;
  secondHeader?: JSX.Element;
  thirdHeader?: JSX.Element;
  textBody: JSX.Element;
}

enum refArray {
  farLeft,
  left,
  mid,
  right,
  farRight,
}
const numberOfCards = 5;

export function Slideshow(props: TSlideshowProps) {
  if (props.data.getType() !== "circular") throw Error("list is not circular");

  const [animation, setAnimation] = useState(false)
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const loadingRef = useRef<boolean>(false);

  const cards: {name: string, val: ICard; classes: string }[] = [
    {
      name: "farLeft",
      val: props.data.getHead().prev!.prev!.val,
      classes: "side-card far-left",
    },
    {
      name: "left",
      val: props.data.getHead().prev!.val,
      classes: "side-card left",
    },
    {name: "mid", val: props.data.getHead().val, classes: "mid" },
    {
      name: "right",
      val: props.data.getHead().next!.val,
      classes: "side-card right",
    },
    {
      name: "farRight",
      val: props.data.getHead().next!.next!.val,
      classes: "side-card far-right",
    },
  ];

  const changeIndex = (value: "prev" | "next") => {
    if (loadingRef.current) return;
    console.log("index changed");
    loadingRef.current = true;
    const afterAnimationCallback = () => {
      console.log("animation end");
      console.log(props.data.getHead().val);
      resetAnimationTags();
      loadingRef.current = false;
      if(value === "prev"){

      }
    };

    cardsRef.current[refArray.mid].addEventListener(
      "animationend",
      afterAnimationCallback
    );

    const animateIncrease = () => {
      cardsRef.current[refArray.left].classList.add("leftToFarLeft-animation");
      cardsRef.current[refArray.mid].classList.add("midToLeft-animation");
      cardsRef.current[refArray.right].classList.add("rightToMid-animation");
      cardsRef.current[refArray.farRight].classList.add(
        "farRightToRight-animation"
      );
    };

    const animateDecrease = () => {
      cardsRef.current[refArray.farLeft].classList.add(
        "farLeftToLeft-animation"
      );
      cardsRef.current[refArray.left].classList.add("leftToMid-animation");
      cardsRef.current[refArray.mid].classList.add("midToRight-animation");
      cardsRef.current[refArray.right].classList.add(
        "rightToFarRight-animation"
      );
    };

    const resetAnimationTags = () => {
      const tagsToRemove = [
        "farLeftToLeft-animation",
        "leftToMid-animation",
        "midToRight-animation",
        "rightToFarRight-animation",
        "farRightToRight-animation",
        "rightToMid-animation",
        "midToLeft-animation",
        "leftToFarLeft-animation",
        // "side",
        // "left",
        // "far-left",
        // "left",
        // "mid",
        // "right",
        // "far-right"
      ];
      tagsToRemove.map((item) => {
        cardsRef.current[refArray.farLeft].classList.remove(item);
        cardsRef.current[refArray.left].classList.remove(item);
        cardsRef.current[refArray.mid].classList.remove(item);
        cardsRef.current[refArray.right].classList.remove(item);
        cardsRef.current[refArray.farRight].classList.remove(item);
      });
      cardsRef.current.map((el) =>
        el.removeEventListener("animationend", afterAnimationCallback)
      );
    };

    props.data.selectNode({ index: value });
    value === "next" ? animateIncrease() : animateDecrease();
  };

  return (
    <>
      <input
        type="button"
        value="PRESS ME"
        onClick={() => changeIndex("next")}
        style={{
          position: "absolute",
          bottom: "0px",
          left: "30px",
        }}
      ></input>
      <input
        type="button"
        value="PRESS ME TOO"
        onClick={() => changeIndex("prev")}
        style={{
          position: "absolute",
          bottom: "0px",
          left: "130px",
        }}
      ></input>
      {cards.map((item, index) => {
        return <Card PK={index} inputRef={cardsRef.current} data={item}></Card>;
      })}
      <input
        type="button"
        value="Kiválasztom"
        onClick={() => changeIndex("prev")}
      className="select-btn"
      ></input>
    </>
  );
}

const Card = React.forwardRef(
  (
    props: {
      PK: number;
      inputRef: HTMLDivElement[];
      data: {
        val: ICard;
        classes: string;
      };
      onclick?: Function
    },
    ref
  ) => (
    <div
      key={`card-${props.PK}`}
      ref={(el) =>
        el && el != props.inputRef[props.PK] && props.inputRef.push(el)
      }
      className={`slideshow-card 
      ${props.data.classes}
      d-flex
      flex-column
      align-items-center`}
      onClick={e=>{e.preventDefault()}}
    >
      <div className="card-header pt-5 d-flex justify-content-center align-items-center">
        <p>{props.data.val.header}</p>
      </div>
      {props.data.val.secondHeader && <div className="card-second-header pt-1 d-flex">{props.data.val.secondHeader} </div>}
      {props.data.val.thirdHeader && <div className="card-third-header pt-1 d-flex"><p>{props.data.val.thirdHeader}</p></div>}

      <div className="card-text-body">{props.data.val.textBody}</div>
    </div>
  )
);
