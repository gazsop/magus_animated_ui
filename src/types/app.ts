import { UI_THEME } from "../assets/constants";
import { User } from "../core/User";
import { Optional } from "./common";
import { IUserData } from "./user";

export type TInterfaceTheme = (typeof UI_THEME)[keyof typeof UI_THEME];

export interface IAppData {
	page: string;
	loading: number;
	debugWindow: boolean;
	interfaceTheme: TInterfaceTheme;
	appStatus: boolean;
}

export type TUpdateAppData = Optional<IAppData, keyof IAppData>;

export interface IAppContext {
	getUser: () => User;
	setUser: (val: User | Optional<IUserData, keyof IUserData>) => void;
	setLoading: (val: "start" | "end") => void;
	readonly getLoading: boolean;
	toggleInterfaceTheme: () => void;
	readonly getInterfaceTheme: string;
	readonly getAppStatus: boolean;
	getAppData: IAppData;
}
