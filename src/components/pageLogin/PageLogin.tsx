import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../core/App";
import logo from "../../assets/logo.png";
import PageLoginInput from "./PageLoginInput";
import { Navigate, useOutletContext } from "react-router-dom";
import login from "../../assets/imgs/bg/login.png";
import loginClick from "../../assets/audio/login-click.wav";
import { useFrontEndRouter } from "../../core/FrontEndRouter";
import { IRegexErrorArray } from "@appTypes/magus_app_types";
// import { useAppData } from "../../core/FrontEndRouter";

export function Login(props: {
	loginFn?: (uid: string, pwd: string) => void;
}) {
	const [loginError, setLoginError] = useState<IRegexErrorArray[] | null>(null);

	const InputField = () => {
		const clickAudio = new Audio(loginClick);
		const numberOfElements = 9;
		const centerElement = true;
		const radius = 300;
		const angleIncrement = 360 / numberOfElements;

		const {navigator} = useFrontEndRouter();

		// const { isLoggedIn } = useAppData();
		console.log("Login render");
		// console.log(navigator("/game/adventures"));
		// const router = useAppData();

		const [inputElements, setInputElements] = useState<{
			uid: {
				x: number;
				y: number;
				angle: number;
				rotationAngle: number;
				value: string;
				selected: boolean;
			}[];
			pwd: {
				x: number;
				y: number;
				angle: number;
				rotationAngle: number;
				value: string;
				selected: boolean;
			}[];
		}>();

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
			});

			setInputElements({
				uid: newElementsUid,
				pwd: newElementsPwd,
			});
		}, []);

		const handleInputClick = (index: number, type: "pwd" | "uid") => {
			const newElements = { ...inputElements };
			if (type === "pwd") {
				if (!newElements || !newElements.pwd) return;
				if (
					newElements.pwd.filter((item) => item.selected).length >= 4 &&
					!newElements.pwd[index].selected
				)
					return;
				newElements!.pwd[index].selected = !newElements!.pwd[index].selected;
			} else {
				if (!newElements || !newElements.uid) return;
				if (
					newElements.uid.filter((item) => item.selected).length >= 4 &&
					!newElements.uid[index].selected
				)
					return;
				newElements!.uid[index].selected = !newElements!.uid[index].selected;
			}
			// clickAudio.pause();
			// clickAudio.currentTime = 0;
			// clickAudio.play();
			setInputElements(newElements as typeof inputElements);
		};

		const login = () => {
			let error = false;
			const pwd = inputElements?.pwd
				.filter((item) => item.selected)
				.map((item) => item.value)
				.join("") as string;
			const uid = inputElements?.uid
				.filter((item) => item.selected)
				.map((item) => item.value)
				.join("") as string;
			//return if length is not 4
			// if(isInputElementsReady() === false) error = true;
			// if(!error) setUser({
			// 	uid: uid,
			// 	pwd: pwd
			// })
			console.log("login");
			navigator("/game/adventures")
		};

		//getter for input elements ready check
		const isInputElementsReady = () => {
			if (!inputElements) return false;
			if (inputElements.pwd.filter((item) => item.selected).length !== 4)
				return false;
			if (inputElements.uid.filter((item) => item.selected).length !== 4)
				return false;
			return true;
		};

		return (
			<div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
				<div className="d-flex flex-wrap flex-row justify-content-center align-items-center">
					{inputElements &&
						inputElements.pwd.map((item, i) => (
							<div
								className="d-flex flex-wrap justify-content-center align-items-center"
								key={`inputCell${i}`}
								style={{
									transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotationAngle}deg)`,
								}}
							>
								<div
									className={`input-field input-field-btn pwd${
										item.selected ? " selected" : ""
									}`}
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
					{inputElements &&
						inputElements.uid.map((item, i) => (
							<div
								className="d-flex flex-wrap justify-content-center align-items-center"
								key={`inputCell${i}`}
								style={{
									transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotationAngle}deg)`,
								}}
							>
								<div
									className={`input-field input-field-btn uid${
										item.selected ? " selected" : ""
									}`}
									style={{
										width: "100px",
										height: "100px",
									}}
									onClick={() => handleInputClick(i, "uid")}
								>
									{item.value}
								</div>
							</div>
						))}
					{centerElement && (
						<div
							className={`input-field input-field-submit${
								isInputElementsReady() ? " active" : ""
							}`}
							onClick={login}
						>LOGIN</div>
					)}
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
			<img
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
