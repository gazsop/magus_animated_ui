import { useState, useEffect, useRef } from "react";
import "../../assets/css/book.css";
import book_cover from "../../assets/imgs/book_cover.png";
import book_backside from "../../assets/imgs/book_backside.png";
import { IAdventure } from "../../types/common";
import { Image } from "react-bootstrap";

const nrOfPages = 9;

interface IBookProps {
	data: IAdventure;
	onclickState: number;
	currentPage: {
		ref: number[];
		index: number;
		setRef: (index: number, page: number) => void;
	};
}

const pagesJsx = (
	ref: string[],
	arg?: IAdventure
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
				<Image src={book_cover} fluid />
				{arg?.character.name}
			</div>,
			<div key={ref[1]}>Page 1</div>,
			<div key={ref[2]}>Page 2</div>,
			<div
				key={ref[3]}
				style={{
					backgroundColor: "red",
				}}
			>
				<Image src={book_backside} fluid />
			</div>,
		],
		jsxLength: function () {
			return this.jsx.length;
		},
	};
};

const Book = (props: IBookProps) => {
	// // console.log("book index: ",props.currentPage.index);

	const [currentPage, setCurrentPage] = useState(
		props.currentPage.ref[props.currentPage.index]
	);
	const [pages, setPages] = useState<JSX.Element[]>([]);

	const pageRef = useRef<string[]>(
		[...Array(11)].map((_) => crypto.randomUUID())
	);
	const bookComponentsRef = useRef<string[]>(
		[...Array(2)].map((_) => crypto.randomUUID())
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
				key={`page-${pageRef.current[index]}`}
				onClick={
					index % 2 === 0
						? (e) => {
								if (currentPage === 0) return;
								e.stopPropagation();
								setBookPages("incr");
						  }
						: (e) => {
								if (currentPage === 0) return;
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
		props.currentPage.setRef(props.currentPage.index, currentPage);
		// console.log("book useffect, props.currentPage.setRef: ", props.currentPage.setRef(props.currentPage.index, currentPage));
		// console.log("book useffect, currentPage", currentPage);
		// console.log(props.currentPage.ref);
	}, [currentPage]);

	useEffect(() => {
		if(currentPage !== 0) return;
		setCurrentPage(props.currentPage.ref[props.currentPage.index]);
	}, [props.currentPage.ref[props.currentPage.index]]);

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
				key={bookComponentsRef.current[0]}
			>
				<div
					className={`pages ${
						currentPage === 0 || currentPage === pages.length
							? "pages-closed"
							: ""
					}`}
					key={bookComponentsRef.current[1]}
				>
					{pages.map((page) => page)}
					{`currentPage: ${props.data.id}`}
				</div>
			</div>
			<button
				onClick={(e) => {
					if (currentPage === 0) {
						setCurrentPage(2);
						console.log("selected onclick");
					}
				}}
			>
				SELECT
			</button>
		</>
	);
};

export default Book;
