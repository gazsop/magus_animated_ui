import React, { useState, useRef } from "react";
import { Id } from "../../utils/getId";
import "../../assets/css/game.css";
import { Slideshow } from "../elements/Slideshow";
import { linkedList } from "../../utils/linkedList";
import adventures_bg from "../../assets/imgs/bg/adventures.png";
import { testAdventure } from "../../data/_testAdvanture";
import Book from "../elements/Book";

export function Adventures(): JSX.Element {
	
	const bookRef = useRef<any[]>(testAdventure.map(() => ({
		index: 0,
		setIndex: () => {},
	})));

	const [adventureSelected, setAdventureSelected] = useState<boolean>(false);

	const allAdvantures = new linkedList(
		[
			...testAdventure.map((adventure, index) => ({
				jsx: (<Book
					data={adventure}
					key={adventure.id}
					currentPage={bookRef.current[index]}
					selected={()=>setAdventureSelected(prev => !prev)}
				/>),
				data: adventure,
				selected: false,
			})),
		],
		"circular"
	);

	return (
		<div
			style={{
				background: `url(${adventures_bg}) no-repeat center center fixed`,
				backgroundSize: "cover",
				height: "100vh",
				width: "100vw",
			}}
		>
			{allAdvantures && (
				<Slideshow
					data={allAdvantures}
					layout="adventure"
					cardSelected={!adventureSelected}
				/>
			)}
		</div>
	);
}
