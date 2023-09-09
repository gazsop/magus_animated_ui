import { useRef, useState } from "react";
import { linkedList } from "./linkedList";
import "../assets/css/slideshow.css";
import { Id } from "./getId";

export interface ICardSlideshow {
	jsx: JSX.Element;
	data: any;
	selected: boolean;
}

type TSlideshowProps = {
	layout?: "adventure";
	selectCard: () => void;
	data: linkedList<ICardSlideshow>;
};

type TCardPositions = (typeof cardPositions)[keyof typeof cardPositions];

interface ICardData {
	name: TCardPositions;
	val: JSX.Element;
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

const cardsData: (linkedList: linkedList<ICardSlideshow>) => ICardData[] = (
	data
) => {
	return [
		{
			name: cardPositions.farLeft,
			val: data.getHead.prev!.prev!.val.jsx,
			classes: "side-card far-left",
			animationClasses: {
				toLeft: "no-animation",
				toRight: "farLeftToLeft-animation",
			},
		},
		{
			name: cardPositions.left,
			val: data.getHead.prev!.val.jsx,
			classes: "side-card left",
			animationClasses: {
				toLeft: "leftToFarLeft-animation",
				toRight: "leftToMid-animation",
			},
		},
		{
			name: cardPositions.mid,
			val: data.getHead.val.jsx,
			classes: "mid",
			animationClasses: {
				toLeft: "midToLeft-animation",
				toRight: "midToRight-animation",
			},
		},
		{
			name: cardPositions.right,
			val: data.getHead.next!.val.jsx,
			classes: "side-card right",
			animationClasses: {
				toLeft: "rightToMid-animation",
				toRight: "rightToFarRight-animation",
			},
		},
		{
			name: cardPositions.farRight,
			val: data.getHead.next!.next!.val.jsx,
			classes: "side-card far-right",
			animationClasses: {
				toLeft: "farRightToRight-animation",
				toRight: "no-animation",
			},
		},
	];
};

export function Slideshow(props: TSlideshowProps) {
	console.log("slideshow");
	if (props.data.getType !== "circular") throw Error("list is not circular");

	const [animation, setAnimation] = useState<"prev" | "next" | null>(null);
	const cards = useRef<ICardData[]>(cardsData(props.data));
	const cardKeyRef = useRef([...Array(5)].map((item) => crypto.randomUUID()));

	const afterAnimationCallback = (e: React.AnimationEvent) => {
		if (!animation) return;
		if (e.animationName !== "leftToMidTransition") return;
		cardKeyRef.current =
			animation === "prev"
				? [
						cardKeyRef.current[4],
						...cardKeyRef.current.filter((_, index) => index !== 4),
				  ]
				: [
						...cardKeyRef.current.filter((_, index) => index !== 0),
						cardKeyRef.current[0],
				  ];
		props.data.selectNode({ index: animation });
		setAnimation(null);
		console.log(animation);
		cards.current = cardsData(props.data);
	};

	const animateIncrease = () =>
		cards.current.map(
			(card) =>
				(card.classes = `${card.classes} ${card.animationClasses.toLeft}`)
		);

	const animateDecrease = () =>
		cards.current.map(
			(card) =>
				(card.classes = `${card.classes} ${card.animationClasses.toRight}`)
		);

	const changeIndex = (value: "prev" | "next") => {
		console.log(animation);
		if (animation) return;
		setAnimation(value);
		console.log(cardKeyRef.current);
		value === "next" ? animateIncrease() : animateDecrease();
	};

	const getCardFunctions = (
		cardName: TCardPositions,
		e?: React.AnimationEvent
	) => {
		if (cardName === cardPositions.left)
			return {
				onClick: () => changeIndex("prev"),
			};
		if (cardName === cardPositions.mid)
			return {
				onClick: () => props.selectCard(),
				onAnimationEnd: e !== undefined ? afterAnimationCallback(e) : undefined,
			};
		if (cardName === cardPositions.right)
			return {
				onClick: () => changeIndex("next"),
			};
		return {
			onClick: () => {},
		};
	};

	return (
		<>
			{cards.current.map((card, index) => (
				<div
					key={cardKeyRef.current[index]}
					className={`${card.classes}
						slideshow-card 
						d-flex
						flex-column
						align-items-center
						justify-content-center`}
					onAnimationEnd={(e) =>
						getCardFunctions(card.name, e).onAnimationEnd ?? (() => {})
					}
					onClick={getCardFunctions(card.name).onClick}
				>
					{cardKeyRef.current[index]}
					{card.val}
				</div>
			))}
			<input
				type="button"
				value="Prev"
				onClick={() => changeIndex("prev")}
				className="select-btn"
				key="prevBtn"
			></input>
			<input
				type="button"
				value="Select"
				onClick={() => props.selectCard()}
				className="select-btn"
				key="selectBtn"
				style={{ 
					left: "50%",
					transform: "translateX(-50%)",
				 }}
			></input>
			<input
				type="button"
				value="Next"
				onClick={() => changeIndex("next")}
				className="select-btn"
				key="nextBtn"
				style={{
					right: "0",
				}}
			></input>
			<ul
				style={{
					position: "absolute",
					bottom: "80px",
					right: "0",
					background: "white",
					listStyle: "none",
				}}
			>
				<li>
					{animation}
				</li>
				<li>
					{cardKeyRef.current[0]}
				</li>
				<li>
					{props.data.getHead.val.data.id}
				</li>
			</ul>
		</>
	);
}
