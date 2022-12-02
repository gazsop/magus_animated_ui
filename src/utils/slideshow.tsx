import {
  createRef,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { linkedList } from "./linkedList";
import "../assets/slideshow.css";
import React from "react";
import { Id } from "./getId";

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

interface ICardData {
  name: typeof cardPositions[keyof typeof cardPositions];
  val: ICard;
  classes: string;
  animationClasses: { toLeft: string; toRight: string };
}

const cardPositions = {
  farLeft: "farLeft",
  left: "left",
  mid: "mid",
  right: "right",
  farRight: "farRight",
};
const numberOfCards = 5;
const cardsData: (linkedList: linkedList<ICard>) => ICardData[] = (data) => {
  return [
    {
      name: cardPositions.farLeft,
      val: data.getHead().prev!.prev!.val,
      classes: "side-card far-left",
      animationClasses: {
        toLeft: "no-animation",
        toRight: "farLeftToLeft-animation",
      },
    },
    {
      name: cardPositions.left,
      val: data.getHead().prev!.val,
      classes: "side-card left",
      animationClasses: {
        toLeft: "leftToFarLeft-animation",
        toRight: "leftToMid-animation",
      },
    },
    {
      name: cardPositions.mid,
      val: data.getHead().val,
      classes: "mid",
      animationClasses: {
        toLeft: "midToLeft-animation",
        toRight: "midToRight-animation",
      },
    },
    {
      name: cardPositions.right,
      val: data.getHead().next!.val,
      classes: "side-card right",
      animationClasses: {
        toLeft: "rightToMid-animation",
        toRight: "rightToFarRight-animation",
      },
    },
    {
      name: cardPositions.farRight,
      val: data.getHead().next!.next!.val,
      classes: "side-card far-right",
      animationClasses: {
        toLeft: "farRightToRight-animation",
        toRight: "no-animation",
      },
    },
  ];
};

export function Slideshow(props: TSlideshowProps) {
  if (props.data.getType() !== "circular") throw Error("list is not circular");

  const [animation, setAnimation] = useState(false);
  const [cards, setCards] = useState<ICardData[]>(cardsData(props.data));
  const cardKeyRef = useRef(Array(5).fill("").map(item=>Id.getRand(9)))

  console.log(cardKeyRef.current);
  const afterAnimationCallback = ()=>{
    setAnimation(false);
    setCards(cardsData(props.data))
  };

  const animateIncrease = () =>
    cards.map(
      (card) =>
        (card.classes = `${card.classes} ${card.animationClasses.toLeft}`)
    );

  const animateDecrease = () =>
    cards.map(
      (card) =>
        (card.classes = `${card.classes} ${card.animationClasses.toRight}`)
    );

  const changeIndex = (value: "prev" | "next") => {
    if(animation) return;
    setAnimation(true);
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
        key="leftBtn"
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
        key="rightBtn"
      ></input>
      {cards.map((card, i) => (
        <Card
          data={card}
          onAnimationEndCallback={
            card.name === cardPositions.mid ? afterAnimationCallback : () => {}
          }
          key={cardKeyRef.current[i]}
        ></Card>
      ))}

      <input
        type="button"
        value="Kiválasztom"
        onClick={() => changeIndex("prev")}
        className="select-btn"
        key="selectBtn"
      ></input>
    </>
  );
}

const Card = (props: {
  data: {
    val: ICard;
    classes: string;
  };
  onclick?: Function;
  onAnimationEndCallback: Function;
}) => (
  <div
    className={`slideshow-card 
      ${props.data.classes}
      d-flex
      flex-column
      align-items-center`}
    onClick={(e) => {
      e.preventDefault();
    }}
    onAnimationEnd={() => {
      console.log("animationend");
      props.onAnimationEndCallback();
    }}
  >
    <div className="card-header pt-5 d-flex justify-content-center align-items-center">
      {props.data.val.header}
    </div>
    {props.data.val.secondHeader && (
      <div className="card-second-header pt-1 d-flex">
        {props.data.val.secondHeader}
      </div>
    )}
    {props.data.val.thirdHeader && (
      <div className="card-third-header pt-1 d-flex">
        {props.data.val.thirdHeader}
      </div>
    )}

    <div className="card-text-body">{props.data.val.textBody}</div>
  </div>
);
