import { UI_THEME } from "../assets/constants";
import { Optional } from "./common";

export type TInterfaceTheme = (typeof UI_THEME)[keyof typeof UI_THEME];

export interface IAppData {
	loading: number;
	debugWindow: boolean;
	interfaceTheme: TInterfaceTheme;
	appDeploymentStatus: boolean;
	error: string | null;
	view: "desktop" | "mobile";
}

export type TUpdateAppData = Optional<IAppData, keyof IAppData>;

export interface IAppContext {
	setLoading: (val: "start" | "end") => void;
	readonly getLoading: boolean;
	toggleInterfaceTheme: () => void;
	readonly getInterfaceTheme: string;
	readonly getappDeploymentStatus: boolean;
	getAppData: IAppData;
	setAppData: (val: TUpdateAppData) => void;
}
