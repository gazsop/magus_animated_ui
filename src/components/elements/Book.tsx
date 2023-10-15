import { useState, useEffect, useRef } from "react";
import "../../assets/css/book.css";
import book_cover from "../../assets/imgs/book_cover.png";
import book_backside from "../../assets/imgs/book_backside.png";
import { Adventure } from "../../types/common";
import { Image } from "react-bootstrap";

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
	arg?: Adventure.IAdventure
): {
	jsx: JSX.Element[];
	jsxLength: () => number;
} => {
	return {
		jsx: [
			<div
				style={{
					width: "100%",
					height: "100%",
				}}
				key={ref[0]}
			>
				<Image src={book_cover} style={{ 
					height: "100%",
					width: "auto"
				 }} />
				<div
					style={{ 
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					 }}
				>

				</div>
			</div>,
			<div key={ref[1]}>Page 1</div>,
			<div key={ref[2]}>Page 2</div>,
			<div 
				style={{
					width: "100%",
					height: "100%",
				}}
				key={ref[3]}
			>
				<Image src={book_backside} style={{ 
					height: "100%",
					width: "auto"
				 }} fluid />
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

	console.log(props);
	useEffect(() => {
		if (currentPage === formerPage.current) return;
		if (
			(currentPage === 2 && formerPage.current === 0)
			|| (currentPage === 0 && formerPage.current === 2)
		) props.selected();
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
		setPages(generatePage(pagesJsx(pageRef.current, props.data).jsx));
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
						: (currentPage !== 0) && currentPage !== 0
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
