import { createRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
	useOutlet,
	RouteObject,
	Navigate,
	useNavigate,
	useOutletContext,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UI_THEME } from "../assets/constants";
import { Login } from "../components/pageLogin/PageLogin";
import { Admin } from "../components/pageAdmin/Admin";
import { linkedList } from "../utils/linkedList";
import { Adventures } from "../components/pageAdvantures/PageAdventures";
import { Optional, User } from "@appTypes/magus_app_types";
import "../assets/css/router.css";

import adventures_bg from "../assets/imgs/bg/adventures.png";
import login from "../assets/imgs/bg/login.png";
import { ProtectedRoute } from "./FrontEndRouter_ProtectedRoutes";
import book_backside from "../assets/imgs/book_backside.png";
import book_cover from "../assets/imgs/book_cover.png";
import { IAppData, TUpdateAppData } from "../types/app";
import logo from "../assets/imgs/logo.png";

type TRouteNames = "login" | "adventures" | "adventure";

export type TRoute = {
	path: string;
	name: TRouteNames;
	element: JSX.Element;
	userRangReq: string;
	nodeRef: React.RefObject<HTMLDivElement>;
};

const animationDirectionClasses = {
	left: "page-animation-left",
	right: "page-animation-right",
};

export const routesArray: TRoute[] = [
	{
		path: "/login",
		name: "login",
		element: <Login />,
		userRangReq: User.USER_RANK.UNAUTH,
		nodeRef: createRef<HTMLDivElement>(),
	},
	{
		path: "/game/adventures",
		name: "adventures",
		element: <Adventures />,
		userRangReq: User.USER_RANK.UNAUTH,
		nodeRef: createRef<HTMLDivElement>(),
	},
];

const animationTime = {
	val: 1000,
	get: () => `${animationTime.val / 1000}s`,
};

// debugger;
type TanimationDirectionClasses =
	(typeof animationDirectionClasses)[keyof typeof animationDirectionClasses];

interface IRouterStates {
	animationDirection: TanimationDirectionClasses | null;
	current: linkedList<TRoute>["getHead"];
	target: linkedList<TRoute>["getHead"];
	nextTarget: linkedList<TRoute>["getHead"];
	isLoggedIn: boolean;
}

interface IRouterGenerator {
	router: ReturnType<typeof createBrowserRouter>;
	routes: linkedList<TRoute>;
	routesArray: TRoute[];
}

const initialAppData: IAppData = {
	loading: 1,
	debugWindow: false,
	interfaceTheme: UI_THEME.DARK,
	appDeploymentStatus: process.env.NODE_ENV === "development" ? true : false,
	error: null,
	view: "desktop",
};

const testRouter: () => IRouterGenerator = () => {
	const routes = new linkedList<TRoute>(routesArray, "plain");
	return {
		router: createBrowserRouter([
			{
				path: "/",
				element: <AppBody />,
				errorElement: <Navigate to="/login" replace />,
				children: routes.getAllNodes().map<RouteObject>((route) => ({
					index: route.val.path === "/login",
					path: route.val.path,
					element: route.val.element,
					errorElement: <div>404</div>,
				})),
			},
		]),
		routes: routes,
		routesArray: routesArray,
	};
};

const testInitRouter = testRouter();

function AppBody(): JSX.Element {
	const routesRef = useRef<IRouterGenerator["routes"]>(
		testInitRouter.routes
	).current;

	const [appState, setAppState] = useState<IAppData>(initialAppData);

	const setAppData = (newValue: TUpdateAppData) => {
		setAppState(prev => ({ ...prev, ...newValue }));
	};

	const [routerState, setRouterState] = useState<IRouterStates>({
		animationDirection: null,
		target: routesRef.getHead,
		nextTarget: routesRef.getHead,
		current: routesRef.getHead,
		isLoggedIn: false,
	});

	console.log("routerState", routerState);

	const navigate = useNavigate();
	const location = useLocation();
	const currentOutlet = useOutlet({
		navigator: navigator,
	});
	const nodeRef =
		routesRef.find((route) => route.val.path === location.pathname)?.val
			.nodeRef ?? null;
	const setRouter = (data: Optional<IRouterStates, keyof IRouterStates>) => {
		setRouterState((prev) => ({ ...prev, ...data }));
	};

	useEffect(() => {
		if (location.pathname === "/") {
			navigate(routesRef.getHead.val.path);
			return;
		}

		if (routesRef.getHead.val.path !== location.pathname) {
			routesRef.selectNode({
				node: routesRef.find((route) => route.val.path === location.pathname),
			});
		}

		if (routerState.current.val.path !== location.pathname) {
			navigator(location.pathname);
		}
	}, []);

	useEffect(() => {
		if (routerState.target !== routerState.current)
			navigate(routerState.nextTarget.val.path);
		else
			setRouter({
				current:
					routesRef.find(
						(route) => route.val.path === routerState.current.val.path
					) ?? routesRef.getHead,
			});
	}, [routerState.nextTarget, routerState.target]);

	useEffect(() => {
		const preloadImages = async () => {
			const images = [adventures_bg, login, book_backside, book_cover, logo];
			const promises = images.map((src) => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.src = src;
					img.onload = resolve;
					img.onerror = reject;
				});
			});
			return await Promise.all(promises);
		};
		preloadImages().then(() => {
			setAppData({ loading: appState.loading - 1 });
		});
	}, []);

	function navigator(targetVal?: string) {
		const currentRoute =
			routesRef.find((route) => route.val.path === location.pathname) ??
			routesRef.getHead;
		if (!!targetVal) {
			const newTarget =
				routesRef.find((route) => route.val.path === targetVal) ??
				routesRef.getHead;
			const newAnimationDirection =
				currentRoute.index < newTarget.index
					? animationDirectionClasses.right
					: animationDirectionClasses.left;
			const newNextTarget =
				(newAnimationDirection === animationDirectionClasses.left
					? currentRoute.prev
					: currentRoute.next) ?? currentRoute;
			setRouter({
				animationDirection: newAnimationDirection,
				nextTarget: newNextTarget,
				current: currentRoute,
				target: newTarget,
			});
		} else {
			const nextTarget =
				routerState.animationDirection === animationDirectionClasses.left
					? currentRoute.prev
					: currentRoute.next;
			setRouter({
				nextTarget: nextTarget ?? routerState.current,
				current: currentRoute,
			});
		}
	}

	const navOnclickHandler = (targetVal: string) => {	
		navigator(targetVal);
	};

	return (
		<div
			className={appState.loading ? "loading" : ""}
		>
			{/* <Navbar bg="light">
				<Nav className="mx-auto">
					{routesRef.getAllNodes().map((route) => (
						<div
							className="nav-link user-select-none"
							key={route.val.path}	
							onClick={() => navOnclickHandler(route.val.path)}
						>
							{route.val.name}
						</div>
					))}
				</Nav>
			</Navbar> */}
			<TransitionGroup>
				<CSSTransition
					onExited={() => navigator()}
					key={location.pathname}
					timeout={600}
					classNames={routerState.animationDirection ?? ""}
					unmountOnExit={false}
				>
					<ProtectedRoute isAllowed={true}>
						<div ref={nodeRef} className={`page`}>
							{currentOutlet}
						</div>
					</ProtectedRoute>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}

export const useFrontEndRouter = () => {
	return useOutletContext<{
		navigator: (targetVal?: string) => void;
	}>();
};

export const FrontEndRouter = () => (
	<RouterProvider fallbackElement={<Login />} router={testInitRouter.router} />
);
