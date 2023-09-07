import { useState, useEffect, useRef } from "react";
import "../../assets/css/book.css";
import book_cover from "../../assets/imgs/book_cover_temp.png";
import { IAdventure } from "../../types/common";

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
					// backgroundImage: `url(${book_cover})`,
					// backgroundSize: "cover",
					// backgroundPosition: "center",
					// backgroundRepeat: "no-repeat",
				}}
				key={ref[0]}
			>
				{arg?.character.name}
			</div>,
			<div key={ref[1]}>Page 1</div>,
			<div key={ref[2]}>Page 2</div>,
			<div key={ref[3]}>Page 3</div>,
			<div key={ref[4]}>Page 4</div>,
			<div key={ref[5]}>Page 5</div>,
			<div key={ref[6]}>Page 6</div>,
			<div key={ref[7]}>Page 7</div>,
			<div key={ref[8]}>Page 8</div>,
			<div key={ref[9]}>Page 9</div>,
			<div key={ref[10]}>Page 10</div>,
			<div key={ref[11]}>Page 11</div>,
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
	const [selected, setSelected] = useState<boolean>(false);

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
					index === 0
						? () => {
              if(!selected){
                setSelected(true);
                return;
              }
            }
						: index % 2 === 0
						? (e) => {
								e.stopPropagation();
								// console.log(e);
								setBookPages("incr");
						  }
						: (e) => {
								// console.log(e);
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
    if(selected) return;
    setCurrentPage(props.currentPage.ref[props.currentPage.index]);
  }, [props.currentPage.ref[props.currentPage.index]]);

	const setBookPages = (dir: "incr" | "decr") => {
		dir === "incr"
			? setCurrentPage(currentPage + 2)
			: setCurrentPage(currentPage - 2);
	};

	return (
		<div
			className={`book ${selected ? "selected" : ""}`}
			key={bookComponentsRef.current[0]}
		>
			<div
				className="pages"
				key={bookComponentsRef.current[1]}
				onClick={() => setSelected(true)}
			>
				{pages.map((page) => page)}
				{`currentPage: ${props.data.id}`}
			</div>
		</div>
	);
};

export default Book;
