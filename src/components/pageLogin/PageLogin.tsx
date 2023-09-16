import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../core/App";
import { Button, Form, Image, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";
import PageLoginInput from "./PageLoginInput";
import { Navigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { IRegexErrorArray } from "../../types/common";
import { User } from "../../core/User";
import login from "../../assets/imgs/bg/login.png";
import loginClick from "../../assets/audio/login-click.wav";

export function Login() {
	const { getUser, setUser } = useApp();
	const [loginError, setLoginError] = useState<IRegexErrorArray[] | null>(null);

	
	const InputField = () => {
		const clickAudio = new Audio(loginClick);
		const [user, setUser] = useState<{
			uid: string;
			pwd: string;
		}>({
			uid: "",
			pwd: "",
		});
		const numberOfElements = 9;
		const centerElement = true;
		const radius = 300;
		const angleIncrement = 360 / numberOfElements;

		const [inputElements, setInputElements] = useState<
			{
				uid: {
						x: number;
						y: number;
						angle: number;
						rotationAngle: number;
						value: string;
						selected: boolean;
					}[],
				pwd: {
						x: number;
						y: number;
						angle: number;
						rotationAngle: number;
						value: string;
						selected: boolean;
					}[];
			}
		>();

		useEffect(() => {
			const newElementsPwd = [...Array(numberOfElements)].map((_, i) => {
				const angle = -90 + i * angleIncrement;
				return {
					x: Math.cos((angle * Math.PI) / 180) * radius,
					y: Math.sin((angle * Math.PI) / 180) * radius,
					angle: angle,
					rotationAngle: angle + 90,
					value: i.toString(),
					selected: false,
				};
			});

			const newElementsUid = [...Array(numberOfElements)].map((_, i) => {
				const char = String.fromCharCode(65 + i);

				const angle = 90 + i * angleIncrement;
				const uidRadius = radius + 100;
				return {
					x: Math.cos((angle * Math.PI) / 180) * uidRadius,
					y: Math.sin((angle * Math.PI) / 180) * uidRadius,
					angle: angle,
					rotationAngle: angle + 90,
					value: char,
					selected: false,
				};
			})

			setInputElements({
				uid: newElementsUid,
				pwd: newElementsPwd,
			});
		}, []);

		const handleInputClick = (index: number, type: "pwd" | "uid") => {
			const newElements = {...inputElements};
			if (type === "pwd") {
				if(!newElements || !newElements.pwd) return;
				if(newElements.pwd.filter(item=>item.selected).length >= 4 && !newElements.pwd[index].selected) return;
				newElements!.pwd[index].selected = !newElements!.pwd[index].selected;
			} else {
				if(!newElements || !newElements.uid) return;
				if(newElements.uid.filter(item=>item.selected).length >= 4 && !newElements.uid[index].selected) return;
				newElements!.uid[index].selected = !newElements!.uid[index].selected;
			}
			clickAudio.pause();
			clickAudio.currentTime = 0;
			clickAudio.play();
			setInputElements(newElements as typeof inputElements);
		};

		const login = () => {
			const pwd = inputElements?.pwd.filter(item=>item.selected).map(item=>item.value).join("");
			const uid = inputElements?.uid.filter(item=>item.selected).map(item=>item.value).join("");
			//return if length is not 4
			if(!pwd || pwd.length !== 4) return;
			if(!uid || uid.length !== 4) return;
			console.log("login");
		};

		return (
			<div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
				<div className="d-flex flex-wrap flex-row justify-content-center align-items-center">
					{inputElements && inputElements.pwd.map((item, i) => (
						<div
							className="d-flex flex-wrap justify-content-center align-items-center"
							key={`inputCell${i}`}
							style={{
								transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotationAngle}deg)`,
							}}
						>
							<div
								className={`input-field input-field-btn pwd${item.selected ? " selected" : ""}`}
								style={{
									width: "100px",
									height: "100px",
								}}
								onClick={() => handleInputClick(i, "pwd")}
							>
								{item.value}
							</div>
						</div>
					))}
					{
						inputElements && inputElements.uid.map((item, i) => (
							<div
								className="d-flex flex-wrap justify-content-center align-items-center"
								key={`inputCell${i}`}
								style={{
									transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotationAngle}deg)`,
								}}
							>
								<div
									className={`input-field input-field-btn uid${item.selected ? " selected" : ""}`}
									style={{
										width: "100px",
										height: "100px",
									}}
									onClick={() => handleInputClick(i, "uid")}
								>
									{item.value}
								</div>
							</div>
						))
					}
					{centerElement && (<div
						className="input-field input-field-submit"
						onClick={login}
					>
						LOGIN
					</div>)}
				</div>
			</div>
		);
	};

	return (
		<div
			className={[
				"d-flex",
				"login-form",
				"flex-wrap",
				"py-4",
				"px-3",
				"mx-auto",
				"justify-content-center",
				"align-items-center",
				"align-self-center",
			].join(" ")}
			style={{
				height: "100vh",
				width: "100vw",
			}}
		>
			<Image
				src={login}
				style={{
					position: "absolute",
					top: 0,
					zIndex: -1,
					minWidth: "100vw",
					aspectRatio: "21/9",
				}}
			/>
			<InputField />
		</div>
	);
}
