import React, { useState, useRef } from "react";
import { Id } from "../../utils/getId";
import "../../assets/css/game.css";
import { Slideshow } from "../elements/Slideshow";
import { linkedList } from "../../utils/linkedList";
import { IAdventure } from "../../types/common";
import advantures_bg from "../../assets/imgs/bg/adventures.png";
import { testAdventure } from "../../data/_testAdvanture";
import Book from "../elements/Book";

export function Adventures(): JSX.Element {
	console.log("testAdventure", testAdventure);
	const [advanturesPageState, setAdvanturesPageState] = useState<number>(0);

	const books = useRef<{ jsx: JSX.Element; currentPage: number }[]>(
		testAdventure.map((adventure, index) => {
			return {
				jsx: (
					<Book
						data={adventure}
						key={adventure.id}
						onclickState={advanturesPageState}
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


	return (
		<div
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
					layout="adventure"
				/>
			)}
		</div>
	);
}
