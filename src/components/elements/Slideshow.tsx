import { useMemo, useRef, useState } from "react";
import { linkedList } from "../../utils/linkedList";
import "../../assets/css/slideshow.css"
import { Id } from "../../utils/getId";
import ArrowLeftSelectionIcon from "../../assets/icons/ArrowLeftSelectionIcon";
import ArrowRightSelectionIcon from "../../assets/icons/ArrowRightSelectionIcon";
import React from "react";

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

	
	const linkedListData = props.data;
	console.log("Slideshow render");
	console.log(linkedListData);
	if (linkedListData.getType !== "circular") throw Error("list is not circular");

	const [animation, setAnimation] = useState<"prev" | "next" | null>(null);
	const cards = useRef<ICardData[]>(cardsData(linkedListData));

	const afterAnimationCallback = (e: React.AnimationEvent) => {
		if (!animation) return;
		linkedListData.selectNode({ index: animation });
		setAnimation(null);
		cards.current = cardsData(linkedListData);
	};

	const animateIncrease = () =>
		cards.current.map(
			card =>
				(card.classes = `${card.classes} ${card.animationClasses.toLeft}`)
		);

	const animateDecrease = () =>
		cards.current.map(
			card =>
				(card.classes = `${card.classes} ${card.animationClasses.toRight}`)
		);

	const changeIndex = (value: "prev" | "next") => {
		if (animation) return;
		setAnimation(value);
		value === "next" ? animateIncrease() : animateDecrease();
	};

	const getCardFunctions = (
		cardName: TCardPositions,
		e?: React.AnimationEvent
	) => {
		if (cardName === cardPositions.left)
			return {
				// onClick: () => changeIndex("prev"),
			};
		if (cardName === cardPositions.mid)
			return {
				onClick: () => props.selectCard(),
				onAnimationEnd: e !== undefined ? afterAnimationCallback(e) : undefined,
			};
		if (cardName === cardPositions.right)
			return {
				// onClick: () => changeIndex("next"),
			};
		return {
			onClick: () => {
				console.log("default");
			},
		};
	};
const NavigationArrowsMemo = useMemo(() => {
	if (props.layout !== "adventure") return <></>;
	console.log("use memo");
	return (
		<>
			<div
				className="navigation-arrow navigation-arrow-left"
			>
				<ArrowLeftSelectionIcon	/>
				<div
					className="navigation-arrow-placeholder navigation-arrow-placeholder-left"
					onClick={e => {
						e.stopPropagation()
						if(animation) return;
						changeIndex("prev")
					}}
				></div>
			</div>
			<div
				className="navigation-arrow navigation-arrow-right"
			>
				<ArrowRightSelectionIcon />
				<div
					className="navigation-arrow-placeholder navigation-arrow-placeholder-right"
					onClick={e => {
						e.stopPropagation();
						if(animation) return;
						changeIndex("next")
					}}
				></div>
			</div>
			</>
	)
}, []);

	// const NavigationArrows = React.memo((memoProps?: {}) => {
	// 	if (props.layout !== "adventure") return <></>;
	// 	console.log("react memo");
	// 	return (
	// 		<>
	// 			<div
	// 				className="navigation-arrow navigation-arrow-left"
	// 			>
	// 				<ArrowLeftSelectionIcon	/>
	// 				<div
	// 					className="navigation-arrow-placeholder navigation-arrow-placeholder-left"
	// 					onClick={e => {
	// 						e.stopPropagation()
	// 						if(animation) return;
	// 						changeIndex("prev")
	// 					}}
	// 				></div>
	// 			</div>
	// 			<div
	// 				className="navigation-arrow navigation-arrow-right"
	// 			>
	// 				<ArrowRightSelectionIcon />
	// 				<div
	// 					className="navigation-arrow-placeholder navigation-arrow-placeholder-right"
	// 					onClick={e => {
	// 						e.stopPropagation();
	// 						if(animation) return;
	// 						changeIndex("next")
	// 					}}
	// 				></div>
	// 			</div>
	// 			</>
	// 	)
	// }, (prevProps, nextProps) => {
	// 	console.log("react memo compare");
	// 	return false;
	// });

	const NavigationArrows = () => NavigationArrowsMemo;


	return (
		<>
			{cards.current.map((card, index) => (
				<div
					className={`${card.classes}
						slideshow-card 
						d-flex
						flex-column
						align-items-center
						justify-content-center`}
					onAnimationEnd={(e) =>
						getCardFunctions(card.name, e).onAnimationEnd ?? (() => {})
					}
					onClick={getCardFunctions(card.name).onClick ?? (() => {})}
				>
					{card.val}
				</div>
			))}
			{
				props.layout === "adventure"  && <NavigationArrows />
			}
			<input
				type="button"
				value="Select"
				onClick={() => {
					// props.selectCard();
					document.documentElement.requestFullscreen();
				}}
				className="select-btn"
				key="selectBtn"
				style={{ 
					left: "50%",
					transform: "translateX(-50%)",
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
					{linkedListData.getHead.val.data.id}
				</li>
				<li>
					{linkedListData.getIndex}
				</li>
			</ul>
		</>
	);
}
