import { Character, Adventure } from "@appTypes/magus_app_types";

import { useState, useEffect, useRef } from "react";
import "@css/book.css";
import { HealthAndResourceOrbs } from "../pageCharacter/components/HealthOrb";
import { IMGS } from "@constants";


const nrOfPages = 9;
const hpWidth = 100;

interface IBookProps {
	data: Adventure.IAdventure;
	currentPage: {
		index: number;
		setIndex: React.Dispatch<React.SetStateAction<number>>;
	};
	selected: () => void;
}

const pagesJsx = (
	ref: string[],
	arg: Adventure.IAdventure,
	selected: boolean
): {
	jsx: JSX.Element[];
	jsxLength: () => number;
} => {
	console.log(selected);
	const Cover = () => (
		<div
			style={{
				width: "100%",
				height: "100%",
				margin: "0"
			}}
			key={ref[0]}
		>
			<img
				src={IMGS.APPLICATION.ELEMENTS.BOOK_FRONT_COVER}
				style={{
					height: "100%",
					width: "auto",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<table key={`${arg.characters[0].rp.name}-table0`}>
					<tbody>
						<tr key={`${arg.characters[0].rp.name}-name`}>
							<td key={`${arg.characters[0].rp.name}-name-key`}>Name:</td>
							<td key={`${arg.characters[0].rp.name}-name-value`}>
								{arg.characters[0].rp.name}
							</td>
						</tr>

						<tr key={`${arg.characters[0].rp.name}-Class`}>
							<td key={`${arg.characters[0].rp.name}-Class-key`}>Class:</td>
							<td key={`${arg.characters[0].rp.name}-Class-value`}>
								{arg.characters[0].class}
							</td>
						</tr>

						<tr key={`${arg.characters[0].rp.name}-race`}>
							<td key={`${arg.characters[0].rp.name}-race-key`}>Race:</td>
							<td key={`${arg.characters[0].rp.name}-race-value`}>
								{arg.characters[0].race}
							</td>
						</tr>

						<tr key={`${arg.characters[0].rp.name}-creationDate`}>
							<td key={`${arg.characters[0].rp.name}-creationDate-key`}>
								Creation date:
							</td>
							<td key={`${arg.characters[0].rp.name}-creationDate-value`}>
								{arg.creationDate}
							</td>
						</tr>

						<tr key={`${arg.characters[0].rp.name}-lastUpdate`}>
							<td key={`${arg.characters[0].rp.name}-lastUpdate-key`}>
								Last update:
							</td>
							<td key={`${arg.characters[0].rp.name}-lastUpdate-value`}>
								{arg.lastUpdate}
							</td>
						</tr>

						<tr key={`${arg.characters[0].rp.name}-notes`}>
							<td key={`${arg.characters[0].rp.name}-notes-key`}>Notes:</td>
							<td key={`${arg.characters[0].rp.name}-notes-value`}>
								{arg.notes.map((note) => (
									<div key={`${arg.characters[0].rp.name}-notes-${note.date}`}>
										<div
											key={`${arg.characters[0].rp.name}-notes-${note.date}-date`}
										>
											{note.date}
										</div>
										<div
											key={`${arg.characters[0].rp.name}-notes-${note.date}-sendBy`}
										>
											{note.sendBy}
										</div>
									</div>
								))}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);

	const MainStatField = (props: { style?: React.CSSProperties }) => {
		return (
			<div
				style={{
					width: "calc(100% + 30px)",
					height: hpWidth + 10,
					backgroundColor: "rgba(0,0,0,0.5)",
					margin: "-15px -15px 0px -15px",
					borderRadius: (hpWidth + 10) / 2 + "px",
				}}
			>
				<div style={props.style ? props.style : {}}>
					<table className="hm-stat-table" key="hm-stat-table">
						<tr key="hm-stat-table-row">
							<td key="hm-stat-table-row-atk">
								<img src={IMGS.CHARACTER.HM.ATK} />
							</td>
							<td key="hm-stat-table-row-atk-value">
								{arg.characters[0].hm.ATK.total}
							</td>
							<td key="hm-stat-table-row-def">
								<img src={IMGS.CHARACTER.HM.DEF} />
							</td>
							<td key="hm-stat-table-row-def-value">
								{arg.characters[0].hm.DEF.total}
							</td>
							<td key="hm-stat-table-row-ini">
								<img src={IMGS.CHARACTER.HM.INI} />
							</td>
							<td key="hm-stat-table-row-ini-value">
								{arg.characters[0].hm.DEF.total}
							</td>
							<td key="hm-stat-table-row-aim">
								<img src={IMGS.CHARACTER.HM.AIM} />
							</td>
							<td key="hm-stat-table-row-aim-value">
								{arg.characters[0].hm.AIM.total}
							</td>
						</tr>
					</table>
					<table
						className="main-stat-table"
						style={{
							marginTop: "0px",
						}}
					>
						<tr>
							{arg.characters[0].primaryStats.map((stat, key) => {
								return (
									<>
										<td>
											<div>
												<img
													src={
														IMGS.CHARACTER.PRIM_STAT[stat.name]
													}
													alt={stat.name}
												/>
												<span
													className="tooltiptext"
													style={{
														width: "max-content",
														whiteSpace: "nowrap",
													}}
												>
													{stat.name}
												</span>
											</div>
										</td>
									</>
								);
							})}
						</tr>
						<tr>
							{arg.characters[0].primaryStats.map((stat) => {
								return <td>{stat.val}</td>;
							})}
						</tr>
					</table>
				</div>
			</div>
		);
	};

	const CharacterInventory = () => {
		const slotCoordinates: {
			[key in Character.Item.ITEM_TYPE_EQUIPPABLE]: {
				x: number;
				y: number;
			}[];
		} = {
			[Character.Item.ITEM_TYPE_EQUIPPABLE.HEAD]: [
				{
					x: 144,
					y: 4,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.NECK]: [
				{
					x: 144,
					y: 60,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.SHOULDER]: [
				{
					x: 204,
					y: 54,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.BACK]: [
				{
					x: 202,
					y: 240,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.CHEST]: [
				{
					x: 144,
					y: 115,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.GLOVES]: [
				{
					x: 8,
					y: 47,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.BRACERS]: [
				{
					x: 60,
					y: 47,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.LEGS]: [
				{
					x: 144,
					y: 169,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.BOOTS]: [
				{
					x: 151,
					y: 292,
				},
			],

			[Character.Item.ITEM_TYPE_EQUIPPABLE.ACCESSORY]: [
				{
					x: 204,
					y: 4,
				},
				{
					x: 254,
					y: 4,
				},
				{
					x: 254,
					y: 54,
				},
				{
					x: 254,
					y: 104,
				},
				{
					x: 6,
					y: 237,
				},
				{
					x: 6,
					y: 292,
				},
				{
					x: 60,
					y: 292,
				},
				{
					x: 29,
					y: 367,
				},
				{
					x: 79,
					y: 367,
				},
				{
					x: 129,
					y: 367,
				},
				{
					x: 179,
					y: 367,
				},
				{
					x: 229,
					y: 367,
				},
			],

			[Character.Item.ITEM_TYPE_EQUIPPABLE.WEP1H]: [
				{
					x: 201,
					y: 172,
				},
			],
			[Character.Item.ITEM_TYPE_EQUIPPABLE.WEP2H]: [
				{
					x: 24,
					y: 167,
				},
				{
					x: 24,
					y: 120,
				},
			],
		};
		const ItemSlots = () => {
			const itemSlotWidthFactor = 0.14;
			const itemSlotWidth = Math.round(itemSlotWidthFactor * 300);
			return Object.keys(slotCoordinates).map((slotCoordinateKey) =>
				slotCoordinates[slotCoordinateKey as keyof typeof slotCoordinates].map(
					(slotCoordinate) => (
						<div
							style={{
								position: "absolute",
								top: slotCoordinate.y + "px",
								left: slotCoordinate.x + "px",
								width: itemSlotWidth + "px",
								height: itemSlotWidth + "px",
								backgroundColor: "rgba(255,255,255,0.5)",
							}}
						></div>
					)
				)
			);
		};
		return (
			<div
				style={{
					width: "300px",
					position: "relative",
				}}
			>
				<img
					src={IMGS.CHARACTER.ELEMENTS.CHARACTER_INVENTORY}
					style={{
						width: "100%",
						height: "auto",
					}}
				/>
				{ItemSlots()}
			</div>
		);
	};
	const Inventory = (props: Character.Item.TBackpack) => {
		return (
			<table>
				{[...Array(props.size.y)].map((_, y) => (
					<tr>
						{[...Array(props.size.x)].map((_x, x) => (
							<td
								style={{
									width: props.size.weight * 50 + "px",
									height: "50px",
									backgroundImage: `url(${IMGS.CHARACTER.ELEMENTS.BACKPACK_SLOT})`,
								}}
							></td>
						))}
					</tr>
				))}
			</table>
		);
	};

	const FirstPage = () => (
		<div key={ref[1]}>
			<MainStatField
				style={{
					marginLeft: hpWidth + 10 + "px",
					marginRight: hpWidth + 10 + "px",
				}}
			/>
			<HealthAndResourceOrbs
				resourceType={Character.RESOURCE_TYPE.MANA}
				health={{
					current: 50,
					max: 100,
					baseHp: 3,
				}}
				mana={{
					current: 76,
					max: 100,
				}}
				width={hpWidth}
			/>
			<CharacterInventory />
			<Inventory
				size={{
					x: 5,
					y: 4,
					weight: 1,
				}}
				money={[
					{
						name: Character.Item.MONEY.GOLD,
						amount: 100,
					},
					{
						name: Character.Item.MONEY.SILVER,
						amount: 100,
					},
					{
						name: Character.Item.MONEY.COPPER,
						amount: 100,
					},
				]}
				items={[]}
			/>
			<img
				src={IMGS.APPLICATION.ELEMENTS.BOOK_PAGE_BG}
				style={{
					position: "absolute",
					top: "0",
					left: "0",
					height: "100%",
					width: "100%",
					zIndex: "-1",
				}}
			/>
		</div>
	);

	const SecondPage = () => {
		const lengthOfCols = Math.floor(arg.characters[0].secondaryStats.length / 2);
		return (
			<div
				key={ref[2]}
				style={{
					overflowY: "scroll",
					height: "calc(100% - 40px)",
					// thin scroll
					scrollbarWidth: "thin",
				}}
			>
				<table className="secondary-stats">
					<tbody>
						{arg.characters[0].secondaryStats.map((stat, key) => {
							if (key < lengthOfCols)
								return (
									<tr key={`${arg.characters[0].rp.name}-${stat.name}-${key}`}>
										<td
											key={`${arg.characters[0].rp.name}-${stat.name}-${key}-name`}
										>
											{stat.name}
										</td>
										<td
											key={`${arg.characters[0].rp.name}-${stat.name}-${key}-level`}
										>
											{stat.level}
										</td>
										<td
											key={`${arg.characters[0].rp.name}-${stat.name}-${key}-skill`}
										>
											{stat.skill}
										</td>
										{arg.characters[0].secondaryStats[key + lengthOfCols] ? (
											<>
												<td
													key={`${arg.characters[0].rp.name}-${
														arg.characters[0].secondaryStats[key + lengthOfCols]
															.name
													}-${key + lengthOfCols}-name`}
												>
													{
														arg.characters[0].secondaryStats[key + lengthOfCols]
															.name
													}
												</td>
												<td
													key={`${arg.characters[0].rp.name}-${
														arg.characters[0].secondaryStats[key + lengthOfCols]
															.name
													}-${key + lengthOfCols}-level`}
												>
													{
														arg.characters[0].secondaryStats[key + lengthOfCols]
															.level
													}
												</td>
												<td
													key={`${arg.characters[0].rp.name}-${
														arg.characters[0].secondaryStats[key + lengthOfCols]
															.name
													}-${key + lengthOfCols}-skill`}
												>
													{
														arg.characters[0].secondaryStats[key + lengthOfCols]
															.skill
													}
												</td>
											</>
										) : null}
									</tr>
								);
						})}
						{
							<tr>
								<td colSpan={3}>HM per level: {arg.characters[0].hm.hmPerLvl}</td>
							</tr>
						}
					</tbody>
				</table>
			</div>
		);
	};

	if(!selected) return {
		jsx: [
			<Cover />,
			<div key={ref[1]}></div>,
			<div key={ref[2]}></div>,
		],
		jsxLength: function () {
			return this.jsx.length;
		},
	};

	return {
		jsx: [
			<Cover />,
			<FirstPage />,
			<SecondPage />,
			<div
				key={ref[2]}
				style={{
					overflowY: "scroll",
					height: "calc(100% - 40px)",
					// thin scroll
					scrollbarWidth: "thin",
				}}
			></div>,
			<div
				key={ref[2]}
				style={{
					overflowY: "scroll",
					height: "calc(100% - 40px)",
					// thin scroll
					scrollbarWidth: "thin",
				}}
			></div>,
			<div
				style={{
					width: "100%",
					height: "100%",
					margin: "0"
				}}
				key={ref[3]}
			>
				<img
					src={IMGS.APPLICATION.ELEMENTS.BOOK_BACK_COVER}
					style={{
						height: "100%",
						width: "auto"
					}}
				/>
			</div>,
		],
		jsxLength: function () {
			return this.jsx.length;
		},
	};
};

const Book = (props: IBookProps) => {
	// // console.log("book index: ",props.currentPage.index);

	const [currentPage, setCurrentPage] = useState(0);
	const formerPage = useRef<number>(-1);
	const [pages, setPages] = useState<JSX.Element[]>([]);
	const adventure = props.data;

	// console.log(props);
	useEffect(() => {
		if (currentPage === formerPage.current) return;
		if (
			(currentPage === 2 && formerPage.current === 0) ||
			(currentPage === 0 && formerPage.current === 2)
		)
			props.selected();
		formerPage.current = currentPage;
	}, [currentPage]);

	props.currentPage.setIndex = setCurrentPage;
	props.currentPage.index = currentPage;

	const pageRef = useRef<string[]>(
		[...Array(11)].map((_) => (Math.random() + 1).toString(36).substring(7))
	);

	// console.log(pagesJsx(pageRef.current, adventure).jsx.length);

	const generatePage = (jsx: JSX.Element[]): JSX.Element[] => [
		...jsx.map((page, index) => (
			<div
				className={
					(index >= currentPage ? "book-page" : "book-page flipped") +
					` ${index}`
				}
				style={{
					zIndex: index % 2 === 0 ? 10 + jsx.length - index : "auto",
				}}
				key={`book-page-${pageRef.current[index]}`}
				onClick={
					index === 0
						? (e) => {
								e.stopPropagation();
								setBookPages("incr");
						  }
						: 
						index === jsx.length - 1 ? e => {
							e.stopPropagation();
							setBookPages("decr");
						}
						: () => {}
				}
			>
				{page}
				{index === 0 || index === jsx.length - 1 ? (
					<></>
				) : index % 2 === 1 ? (
					<div
						style={{
							position: "absolute",
							bottom: "-20px",
							left: "-20px",
							width: "30px",
							height: "30px",
							transform: "rotate(90deg)",
						}}
						onClick={(e) => {
							e.stopPropagation();
							setBookPages("decr");
						}}
					>
						<img
							src={IMGS.APPLICATION.ELEMENTS.BOOK_PAGE_TURN}
							style={{
								width: "100%",
								height: "auto",
							}}
						/>
					</div>
				) : (
					<div
						style={{
							position: "absolute",
							bottom: "-20px",
							right: "-20px",
							width: "30px",
							height: "30px",
							transform: "rotate(0deg)",
						}}
						onClick={(e) => {
							e.stopPropagation();
							setBookPages("incr");
						}}
					>
						<img
							src={IMGS.APPLICATION.ELEMENTS.BOOK_PAGE_TURN}
							style={{
								width: "100%",
								height: "auto",
							}}
						/>
					</div>
				)}
			</div>
		)),
	];

	useEffect(() => {
		setPages(generatePage(pagesJsx(pageRef.current, adventure, currentPage !== 0).jsx));
	}, [currentPage]);

	const setBookPages = (dir: "incr" | "decr") => {
		dir === "incr"
			? setCurrentPage(currentPage + 2)
			: setCurrentPage(currentPage - 2);
	};

	return (
		<>
			<div
				className={`book ${
					currentPage === pages.length
						? "selected-last"
						: currentPage !== 0 && currentPage !== 0
						? "selected"
						: ""
				}`}
				onClick={(e) => {
					e.preventDefault();
				}}
			>
				<div
					className={`pages ${
						currentPage === 0 || currentPage === pages.length
							? "pages-closed"
							: ""
					}`}
				>
					{pages}
				</div>
			</div>
		</>
	);
};

export default Book;
