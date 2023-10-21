import { useState, useEffect, useRef } from "react";
import "../../assets/css/book.css";
import book_cover from "../../assets/imgs/book_cover.png";
import book_backside from "../../assets/imgs/book_backside.png";
import { Adventure, Character } from "@/magus_app_types";

const nrOfPages = 9;

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
	arg: Adventure.IAdventure
): {
	jsx: JSX.Element[];
	jsxLength: () => number;
} => {
	const Cover = () => (
		<div
			style={{
				width: "100%",
				height: "100%",
			}}
			key={ref[0]}
		>
			<img
				src={book_cover}
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
				<table
					key={`${arg.character.rp.name}-table0`}
				>
					<tbody>
					<tr
						key={`${arg.character.rp.name}-name`}
					>
						<td
							key={`${arg.character.rp.name}-name-key`}
						>Name:</td>
						<td
							key={`${arg.character.rp.name}-name-value`}
						>{arg.character.rp.name}</td>
					</tr>

					<tr
						key={`${arg.character.rp.name}-Class`}
					>
						<td
							key={`${arg.character.rp.name}-Class-key`}
						>Class:</td>
						<td
							key={`${arg.character.rp.name}-Class-value`}
						>{arg.character.class}</td>
					</tr>

					<tr
						key={`${arg.character.rp.name}-race`}
					>
						<td
							key={`${arg.character.rp.name}-race-key`}
						>Race:</td>
						<td
							key={`${arg.character.rp.name}-race-value`}
						>{arg.character.race}</td>
					</tr>

					<tr
						key={`${arg.character.rp.name}-creationDate`}
					>
						<td
							key={`${arg.character.rp.name}-creationDate-key`}
						>Creation date:</td>
						<td
							key={`${arg.character.rp.name}-creationDate-value`}
						>{arg.creationDate}</td>
					</tr>

					<tr
						key={`${arg.character.rp.name}-lastUpdate`}
					>
						<td
							key={`${arg.character.rp.name}-lastUpdate-key`}
						>Last update:</td>
						<td
							key={`${arg.character.rp.name}-lastUpdate-value`}
						>{arg.lastUpdate}</td>
					</tr>

					<tr
						key={`${arg.character.rp.name}-notes`}
					>
						<td
							key={`${arg.character.rp.name}-notes-key`}
						>Notes:</td>
						<td
							key={`${arg.character.rp.name}-notes-value`}
						>
							{arg.notes.map((note) => (
								<div
									key={`${arg.character.rp.name}-notes-${note.date}`}
								>
									<div
										key={`${arg.character.rp.name}-notes-${note.date}-date`}
									>{note.date}</div>
									<div
										key={`${arg.character.rp.name}-notes-${note.date}-sendBy`}
									>{note.sendBy}</div>
								</div>
							))}
						</td>
					</tr>
					</tbody>
					
				</table>
			</div>
		</div>
	);

	const FirstPage = () => (
		<div key={ref[1]}>
			<table
				key={`${arg.character.rp.name}-table1`}
			>
				<tbody>
				{Object.keys(arg.character.rp).map(key => {
					const rpValue = arg.character.rp[key as keyof Character.TRpElements];
					if (typeof rpValue !== "string" && typeof rpValue !== "number")
						return null;
					return (
						<tr
							key={`${key}-${rpValue}`}
						>
							<td
								key={`${key}-${rpValue}-key`}
							>{key}</td>
							<td
								key={`${key}-${rpValue}-value`}
							>{rpValue}</td>
						</tr>
					);
				})}

				<tr
					key={`${arg.character.class}`}
				>
					<td
						key={`${arg.character.class}-key`}
					>Class:</td>
					<td
						key={`${arg.character.class}-value`}
					>{arg.character.class}</td>
				</tr>

				<tr
					key={`${arg.character.race}`}
				>
					<td
						key={`${arg.character.race}-key`}
					>Race:</td>
					<td
						key={`${arg.character.race}-value`}
					>{arg.character.race}</td>
				</tr>
				</tbody>
				
			</table>

			<table
				key={`${arg.character.rp.name}-table2`}
			>
				<tbody>
				<tr
					key={`${arg.character.rp.name}-lvl`}
				>
					<td
						key={`${arg.character.rp.name}-lvl-key`}
					>Level:</td>
					<td
						key={`${arg.character.rp.name}-lvl-value`}
					>{arg.character.level.current}</td>
				</tr>
				<tr
					key={`${arg.character.rp.name}-xp`}
				>
					<td
						key={`${arg.character.rp.name}-xp-key`}
					>Current XP:</td>
					<td
						key={`${arg.character.rp.name}-xp-value`}
					>{arg.character.level.currentXp}</td>
				</tr>
				<tr
					key={`${arg.character.rp.name}-nextxp`}
				>
					<td
						key={`${arg.character.rp.name}-nextxp-key`}
					>Next XP:</td>
					<td
						key={`${arg.character.rp.name}-nextxp-value`}
					>{arg.character.level.nextXp as number}</td>
				</tr>
				</tbody>
				
			</table>

			<table
				key={`${arg.character.rp.name}-table3`}
			>
				<tbody>
				{arg.character.primaryStats.map((stat) => (
					<tr
						key={`${arg.character.rp.name}-${stat.name}`}
					>
						<td
							key={`${arg.character.rp.name}-${stat.name}-key`}
						>{stat.name}</td>
						<td
							key={`${arg.character.rp.name}-${stat.name}-value`}
						>{stat.val}</td>
					</tr>
				))}
				</tbody>
				
			</table>

			<table
				key={`${arg.character.rp.name}-table4`}
			>
				<tbody>
				{Object.keys(arg.character.hm).map((key) => {
					if (key === "hmPerLvl") return null;
					return (
						<tr
							key={`${arg.character.rp.name}-${key}`}
						>
							<td
								key={`${arg.character.rp.name}-${key}-key`}
							>{key}</td>
							<td
								key={`${arg.character.rp.name}-${key}-value`}
							>
								{
									arg.character.hm[
										key as keyof Omit<Character.THmElements, "hmPerLvl">
									].total
								}
							</td>
						</tr>
					);
				})}
				</tbody>
				
			</table>
		</div>
	);

	const SecondPage = () => {
		const lengthOfCols = Math.floor(arg.character.secondaryStats.length / 2);
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
					{arg.character.secondaryStats.map((stat, key) => {
						if (key < lengthOfCols)
							return (
								<tr
									key={`${arg.character.rp.name}-${stat.name}-${key}`}
								>
									<td
										key={`${arg.character.rp.name}-${stat.name}-${key}-name`}
									>{stat.name}</td>
									<td
										key={`${arg.character.rp.name}-${stat.name}-${key}-level`}
									>{stat.level}</td>
									<td
										key={`${arg.character.rp.name}-${stat.name}-${key}-skill`}
									>{stat.skill}</td>
									{arg.character.secondaryStats[key + lengthOfCols] ? (
										<>
											<td
												key={`${arg.character.rp.name}-${arg.character.secondaryStats[key + lengthOfCols].name}-${key + lengthOfCols}-name`}
											>
												{arg.character.secondaryStats[key + lengthOfCols].name}
											</td>
											<td
												key={`${arg.character.rp.name}-${arg.character.secondaryStats[key + lengthOfCols].name}-${key + lengthOfCols}-level`}
											>
												{arg.character.secondaryStats[key + lengthOfCols].level}
											</td>
											<td
												key={`${arg.character.rp.name}-${arg.character.secondaryStats[key + lengthOfCols].name}-${key + lengthOfCols}-skill`}
											>
												{arg.character.secondaryStats[key + lengthOfCols].skill}
											</td>
										</>
									) : null}
								</tr>
							);
					})}
					{
						<tr>
							<td colSpan={3}>HM per level: {arg.character.hm.hmPerLvl}</td>
						</tr>
					}
					</tbody>
					
				</table>
			</div>
		);
	};

	return {
		jsx: [
			<Cover />,
			<FirstPage />,
			<SecondPage />,
			<div
				style={{
					width: "100%",
					height: "100%",
				}}
				key={ref[3]}
			>
				<img
					src={book_backside}
					style={{
						height: "100%",
						width: "auto",
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

	console.log(props);
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
		[...Array(11)].map((_) => crypto.randomUUID())
	);

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
					index % 2 === 0
						? (e) => {
								e.stopPropagation();
								setBookPages("incr");
						  }
						: (e) => {
								e.stopPropagation();
								setBookPages("decr");
						  }
				}
			>
				{page}
			</div>
		)),
	];

	useEffect(() => {
		setPages(generatePage(pagesJsx(pageRef.current, adventure).jsx));
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
