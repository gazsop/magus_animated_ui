import React, { useState, useRef } from "react";
import { Id } from "../../utils/getId";
import "../../assets/css/game.css";
import { Slideshow } from "../../utils/slideshow";
import { linkedList } from "../../utils/linkedList";
import { IAdventure } from "../../types/common";
import advantures_bg from "../../assets/imgs/bg/adventures_2.png";
import { testAdventure } from "../../data/_testAdvanture";
import Book from "../elements/Book";

export function Adventures(): JSX.Element {
	console.log("testAdventure", testAdventure);
	const [advanturesPageState, setAdvanturesPageState] = useState<number>(0);
	const booksCurrentPage = useRef<number[]>(testAdventure.map((_) => 0));
	const setBooksCurrentPage = (index: number, page: number) => {
		console.log("setBooksCurrentPage: ", index, page);
		booksCurrentPage.current[index] = page;
		console.log(
			"setBooksCurrentPage booksCurrentPage.current[index]): ",
			booksCurrentPage.current[index]
		);
		return true;
	};

	const books = useRef<{ jsx: JSX.Element; currentPage: number }[]>(
		testAdventure.map((adventure, index) => {
			return {
				jsx: (
					<Book
						data={adventure}
						key={adventure.id}
						onclickState={advanturesPageState}
						currentPage={{
							ref: booksCurrentPage.current,
							index: index,
							setRef: setBooksCurrentPage,
						}}
					/>
				),
				currentPage: 0,
			};
		})
	);

	const allAdvantures = new linkedList(
		[
			...testAdventure.map((adventure, index) => ({
				jsx: books.current[index].jsx,
				data: adventure,
				selected: false,
			})),
		],
		"circular"
	);
	// const allAdvantures = ()=> new linkedList([...testAdventure.map((adventure, index) =>(
	//   {
	//     jsx: <div>{index}</div>,
	//     data: adventure,
	//     selected: false
	//   }
	// ))], "circular");

	return (
		<div
			className={[
				// "d-flex",
				// "login-form",
				// "flex-wrap",
				// "py-4",
				// "px-3",
				// "mx-auto",
				// "justify-content-center",
				// "align-items-center",
				// "align-self-center",
			].join(" ")}
			style={{
				background: `url(${advantures_bg}) no-repeat center center fixed`,
				backgroundSize: "cover",
				height: "100vh",
				width: "100vw",
			}}
		>
			{advanturesPageState === 0 && (
				<Slideshow
					selectCard={() => {
						console.log("select");
					}}
					data={allAdvantures}
				/>
			)}
		</div>
	);
}
