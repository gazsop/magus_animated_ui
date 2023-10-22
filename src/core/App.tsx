import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CLIENT, SERVER } from "../assets/config";
import adventures_bg from "../assets/imgs/bg/adventures.png";
import login from "../assets/imgs/bg/login.png";
import book_backside from "../assets/imgs/book_backside.png";
import book_cover from "../assets/imgs/book_cover.png";
import logo from "../assets/imgs/logo.png";
import {
  UI_THEME,
} from "../assets/constants";
import {
  Application,
} from "@appTypes/magus_app_types";
import RouterProvider from "./NetworkRouter";
// import ErrorBoundary from "./ErrorHandler";
// import { testAdventure } from "../data/_testadventure";
import ErrorBoundary from "./ErrorHandler";
import { Id } from "../utils/getId";
import { IAppContext, IAppData, TUpdateAppData } from "../types/app";


const initialAppData: IAppData = {
  loading: 1,
  debugWindow: false,
  interfaceTheme: UI_THEME.DARK,
  appDeploymentStatus: process.env.NODE_ENV === "development" ? true : false,
  error: null,
  view: "desktop",
};

function AppProvider(props: {
  children: React.ReactNode;
}): React.ReactElement {
  const { serverPostRequest, serverPostError } = RouterProvider();
  const [app, setApp] = useState<IAppData>(initialAppData);

  const setAppData = (newValue: TUpdateAppData) => {
    setApp((prev) => ({ ...prev, ...newValue }));
  };

  useEffect(() => {
		console.log("app useeffect windowWidth");
		function handleResize() {
			if(window.innerWidth < 1000 && app.view !== "mobile") setAppData({view: "mobile"})
      else if(window.innerWidth >= 1000 && app.view !== "desktop") setAppData({view: "desktop"})
    console.log("app useeffect windowWidth", app.view, window.innerWidth);
    }
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

  //preload images

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
      setAppData({ loading: getAppData.loading - 1 });
    });
	}, []);

  /****************
   * APP - DATA
   * **************/

  console.log("app", app);

  const getAppData = { ...app };

  const getappDeploymentStatus = getAppData.appDeploymentStatus;

  /****************
   * APP - ROUTING
   ****************/

  const requestError: Application.TRequest = (inputData) =>
    serverPostError(inputData, setLoading("start")).then(()=>setLoading("end"));

  /****************
   * APP - UI
   ****************/

  const getLoading = Boolean(getAppData.loading);

  const setLoading = (val: "start" | "end") => {
    if (val === "start")
      setAppData({
        loading: getAppData.loading + 1,
      });
    else
      setAppData({
        loading: getAppData.loading - 1,
      });
  };

  const toggleInterfaceTheme = () =>
    getAppData.interfaceTheme === UI_THEME.DARK
      ? setAppData({
          interfaceTheme: UI_THEME.LIGHT,
        })
      : setAppData({
          interfaceTheme: UI_THEME.DARK,
        });

  const getInterfaceTheme = getAppData.interfaceTheme;

  const getDebugWindow = getAppData.debugWindow;

  return (
    <ErrorBoundary errorHandler={requestError}>
      <AppContext.Provider
        value={{
          setLoading,
          toggleInterfaceTheme,
          getInterfaceTheme,
          getAppData,
          setAppData,
          getLoading,
          getappDeploymentStatus,
        }}
        {...(props as React.PropsWithChildren<{}>)}
      />
    </ErrorBoundary>
  );
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const useApp = () => useContext(AppContext);

export default AppProvider;
