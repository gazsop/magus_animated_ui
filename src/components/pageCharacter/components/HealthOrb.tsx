import resourceBorder from "@images/resource_border.png";
import resourceBubbleFury from "@images/resource_bubble_fury.png";
import resourceBubbleMana from "@images/resource_bubble_mana.png";
import resourceBubbleHealth from "@images/resource_bubble_Health.png";
import transparentBubble from "@images/transparent_bubble.png";
import resourceHealthBg from "@images/resource_health_bg.png";
import { Character } from "@appTypes/magus_app_types";

export const HealthAndResourceOrbs = (props: {
	resourceType: Character.RESOURCE_TYPE;
	health: {
		current: number;
		max: number;
		baseHp: number;
	};
	mana: {
		current: number;
		max: number;
	};
	width: number;
}) => {
	const correctionFactor = props.width / 300;
	const correctedWidthBorder = props.width;
	const borderCorrectionValue = 18 * correctionFactor;
	const correctedWidth = correctedWidthBorder - 2 * borderCorrectionValue;

	const resourceBackground = () => {
		switch (props.resourceType) {
			case Character.RESOURCE_TYPE.RAGE:
				return resourceBubbleFury;
			case Character.RESOURCE_TYPE.ENERGY:
				return resourceBubbleMana;
			default:
				return resourceBubbleMana;
		}
	};

	const correctedHp = Math.round(
		(props.health.current / props.health.max) * 100
	);

	const correctedResource = Math.round(
		(props.mana.current / props.mana.max) * 100
	);
	return (
		<>
			<div
				style={{
					position: "absolute",
					top: "10px",
					left: "10px",
				}}
			>
				<div
					style={{
						position: "relative",
						height: correctedWidthBorder + "px",
						width: correctedWidthBorder + "px",
					}}
				>
					<span 
						className="tooltiptext"
						style={{ 
							maxWidth: correctedWidthBorder + "px",
						 }}	
					>
						ÉP: {props.health.baseHp}
						<br />
						HP: {props.health.current}/{props.health.max}
					</span>
					<img
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							zIndex: 4,
							width: "100%",
							height: "100%",
						}}
						src={resourceBorder}
					/>
					<div
						style={{
							position: "absolute",
							bottom: borderCorrectionValue + "px",
							left: borderCorrectionValue + "px",
							zIndex: 3,
							overflow: "hidden",
							width: correctedWidth + "px",
							height: (correctedWidth * correctedHp) / 100 + "px",
						}}
					>
						<img
							style={{
								position: "absolute",
								bottom: "0px",
								left: "0px",
								width: "100%",
								height: correctedWidth + "px",
							}}
							src={resourceBubbleHealth}
						/>
					</div>
					<img
						style={{
							position: "absolute",
							bottom: borderCorrectionValue + "px",
							left: borderCorrectionValue + "px",
							zIndex: 2,
							width: correctedWidth + "px",
							height: correctedWidth + "px",
						}}
						src={resourceHealthBg}
					/>
				</div>
			</div>
			<div
				style={{
					position: "absolute",
					top: "10px",
					right: "10px",
				}}
			>
				<div
					style={{
						position: "relative",
						height: correctedWidthBorder + "px",
						width: correctedWidthBorder + "px",
					}}
				>
					<span className="tooltiptext">
						ÉP: {props.health.baseHp}
						<br />
						HP: {props.health.current}/{props.health.max}
					</span>
					<img
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							zIndex: 4,
							width: "100%",
							height: "100%",
						}}
						src={resourceBorder}
					/>
					<div
						style={{
							position: "absolute",
							bottom: borderCorrectionValue + "px",
							left: borderCorrectionValue + "px",
							zIndex: 3,
							overflow: "hidden",
							width: correctedWidth + "px",
							height: (correctedWidth * correctedResource) / 100 + "px",
						}}
					>
						<img
							style={{
								position: "absolute",
								bottom: "0px",
								left: "0px",
								width: "100%",
								height: correctedWidth + "px",
							}}
							src={resourceBackground()}
						/>
					</div>
					<img
						style={{
							position: "absolute",
							bottom: borderCorrectionValue + "px",
							left: borderCorrectionValue + "px",
							zIndex: 2,
							width: correctedWidth + "px",
							height: correctedWidth + "px",
						}}
						src={resourceHealthBg}
					/>
				</div>
			</div>
		</>
	);
};
