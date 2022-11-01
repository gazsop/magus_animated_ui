import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT, SERVER } from "../assets/config";
import {
  USER,
  PLACEHOLDER,
  LISTOF_POST_REQ_TYPES,
  UI_THEME,
  STATES,
} from "../assets/constants";
import { IRequestData, IResponseData, TRequest } from "../assets/types";
import RouterProvider from "../router";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

interface IFrontEndError {
  colno: number;
  filename: string;
  lineno: number;
  message: string;
}

interface IFrontEndErrorData
  extends Optional<IFrontEndError, keyof IFrontEndError> {}

interface IAppData {
  error: IFrontEndError;
  page: string;
  loading: string[];
  debugWindow: boolean;
  interfaceTheme: typeof UI_THEME[keyof typeof UI_THEME];
  appStatus: boolean
}

interface IUser {
  id: string;
  uid: string;
  pwd: string;
  rank: typeof USER.RANK[keyof typeof USER.RANK];
  keepLoggedIn: boolean;
}

type TUpdateUser = Optional<IUser, keyof IUser>;

type TUpdateAppData = Optional<IAppData, keyof IAppData>;

const initialAppData: IAppData = {
  // error: {
  //   colno: PLACEHOLDER.NUMBER,
  //   filename: PLACEHOLDER.STRING,
  //   lineno: PLACEHOLDER.NUMBER,
  //   message: PLACEHOLDER.STRING,
  // },
  error: {} as IFrontEndError,
  page: "",
  loading: [],
  debugWindow: true,
  interfaceTheme: UI_THEME.LIGHT,
  appStatus: process.env.NODE_ENV === "development" ? true : false
};

const unauthorizedUser: IUser = {
  id: PLACEHOLDER.STRING,
  uid: PLACEHOLDER.STRING,
  pwd: PLACEHOLDER.STRING,
  keepLoggedIn: STATES.BOOLEAN.OFF,
  rank: USER.RANK.UNAUTH,
};

interface IAppContext {
  getUserData: () => IUser;
  setUserData: (val: TUpdateUser) => void;
  selectAdvanture: (val: string) => void;
  userGetAllAdvantures: () => {};
  logout: () => void;
  setLoading: (val: string) => void;
  readonly getLoading: Array<string>;
  toggleDebugWindow: () => void;
  readonly getDebugWindow: boolean;
  readonly getAppError: IFrontEndError;
  toggleInterfaceTheme: () => {};
  readonly getInterfaceTheme: string;
  readonly getAppStatus: boolean;
  getAppData: IAppData;
}

function AppProvider(props: any) {
  const navigate = useNavigate();
  const { serverPostRequest, serverPostError } = RouterProvider();
  const [user, setUser] = useState<IUser>(unauthorizedUser);
  const [app, setApp] = useState<IAppData>(initialAppData);

  useMemo(() => {
    console.log("useMemo fired");

    window.addEventListener("error", (event) => {
      if (event.error.hasBeenCaught !== undefined) return false;
      event.error.hasBeenCaught = true;
      event.error.handled = false;
      errorHandler({
        colno: event.colno,
        filename: event.filename,
        lineno: event.lineno,
        message: event.message,
      });
    });
  }, []);

  /****************
   * APP
   ****************/

  const setAppData = (newValue: TUpdateAppData) => {
    let key: keyof IAppData;
    let temp = getAppData;

    for (key in newValue) {
      if (
        !Object.prototype.hasOwnProperty.call(app, key) ||
        !Object.prototype.hasOwnProperty.call(newValue, key)
      )
        continue;
      temp = {
        ...temp,
        [key]: newValue[key],
      };
    }
    // const cloneObject = JSON.parse(JSON.stringify(temp.error))
    setApp({...temp,  error: {...temp.error}});
    console.log("temp");
    console.log(temp);
    console.log("temp.error");
    console.log(temp.error);
  };

  const getAppData = { ...app };

  const getAppStatus = getAppData.appStatus
  /****************
   * APP - ROUTING
   ****************/

  const requestError: TRequest = (inputData) => {
    const loaderId = getLoadingId();
    return serverPostError(inputData, setLoading(loaderId));
  };

  /****************
   * APP - UI
   ****************/

  const getLoading = getAppData.loading;

  const setLoading = (actionId: string) => {
    const arrayIndex = getLoading.indexOf(actionId);
    const newArray: string[] = [];
    if (arrayIndex === -1) {
      getLoading.map((item) => {
        newArray.push(item);
      });
      newArray.push(actionId);
    } else {
      getLoading.map((item, index) => {
        if (index !== arrayIndex) newArray.push(item);
      });
    }

    setAppData({
      loading: newArray,
    });
  };

  const getLoadingId: () => string = () =>
    (Math.random() + 1).toString(36).substring(3);

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

  const toggleDebugWindow = () =>
    setAppData({ debugWindow: !getAppData.debugWindow });

  /****************
   * APP - ERROR
   ****************/
  const errorHandler = (errorEvent: IFrontEndError) => {
    console.log("errorhandler");
    console.log(errorEvent);

    // setErrorData(errorEvent)
    setAppData({
      error: { ...errorEvent },
    });
    // serverPostError({
    //   type: LISTOF_POST_REQ_TYPES.ERROR,
    // })
  };

  const getAppError: IFrontEndError = getAppData.error;

  /****************
   * USER
   ****************/
  const setUserData = (newValue: TUpdateUser) => {
    let key: keyof typeof user;
    for (key in user) {
      if (!Object.prototype.hasOwnProperty.call(user, key)) continue;
      const temp: { [key: string]: any } = {};
      if (newValue[key]) {
        if (key === "id" && newValue.id) continue;
        temp[key] = newValue[key];
      }
      setUser((prevState) => ({
        ...prevState,
        ...temp,
      }));
      return true;
    }
    // const response = serverPostRequest({
    //   type: LISTOF_POST_REQ_TYPES.LOGINUNAME,
    //   data: {
    //     name: newValue.id,
    //   },
    // });
  };
  const getUserData = () => {
    return { ...user };
  };
  const logout = () => {
    setUserData(unauthorizedUser);
    serverPostRequest({
      type: LISTOF_POST_REQ_TYPES.LOGOUT,
    });
  };

  /****************
   * ADVANTURES
   ****************/
  const selectAdvanture = (id: string) => {
    navigate("character");
  };

  const userGetAllAdvantures = async () => {
    return [
      {
        id: 1,
        name: "Baljós árnyak",
        char: {
          name: "Obi wan",
          race: "human",
          class: "Jedi master",
          spec: "duel-wield",
          level: 60,
        },
      },
      {
        id: 66,
        name: "A klónok támadása",
        char: {
          name: "Joda mester",
          race: "zöld törpe",
          class: "Jedi force user",
          spec: "force",
          level: 90,
        },
      },
    ];
  };

  return (
    <AppContext.Provider
      value={{
        getUserData,
        setUserData,
        logout,
        selectAdvanture,
        userGetAllAdvantures,
        setLoading,
        getDebugWindow,
        toggleDebugWindow,
        getAppError,
        toggleInterfaceTheme,
        getInterfaceTheme,
        getAppData,
        getLoading,
        getAppStatus
      }}
      {...props}
    />
  );
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const useApp = () => useContext(AppContext);

export default AppProvider;
