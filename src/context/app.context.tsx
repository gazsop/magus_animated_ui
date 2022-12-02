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
  LIST_OF_POST_REQ_TYPES,
  UI_THEME,
  STATES,
} from "../assets/constants";
import { IRequestData, IResponseData, TRequest } from "../assets/types";
import RouterProvider from "../router";
import ErrorBoundary from "../hooks/errorHandler";
import { IAdvanture } from "src/components/advantures/PageAdvantures";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

interface IAppData {
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
  page: "",
  loading: [],
  debugWindow: false,
  interfaceTheme: UI_THEME.DARK,
  appStatus: process.env.NODE_ENV === "development" ? true : false
};

const unauthorizedUser: IUser = {
  id: PLACEHOLDER.STRING,
  uid: PLACEHOLDER.STRING,
  pwd: PLACEHOLDER.STRING,
  keepLoggedIn: STATES.BOOLEAN.OFF,
  rank: USER.RANK.UNAUTH,
};

const testUser: IUser = {
  id: "2",
  uid: "testUser",
  pwd: "pwd",
  keepLoggedIn: STATES.BOOLEAN.OFF,
  rank: USER.RANK.USER,
};

const testAdmin: IUser = {
  id: "1",
  uid: "testAdmin",
  pwd: "pwd",
  keepLoggedIn: STATES.BOOLEAN.OFF,
  rank: USER.RANK.ADMIN,
};

interface IAppContext {
  getUserData: IUser;
  setUserData: (val: TUpdateUser) => void;
  selectAdvanture: (val: string) => void;
  userGetAllAdvantures: () => {};
  logout: () => void;
  setLoading: (val: string) => void;
  readonly getLoading: Array<string>;
  toggleDebugWindow: () => void;
  readonly getDebugWindow: boolean;
  toggleInterfaceTheme: () => {};
  readonly getInterfaceTheme: string;
  readonly getAppStatus: boolean;
  getAppData: IAppData;
}

function AppProvider(props: any) {
  const navigate = useNavigate();
  const { serverPostRequest, serverPostError } = RouterProvider();
  // const [user, setUser] = useState<IUser>(unauthorizedUser);
  const [user, setUser] = useState<IUser>(testUser);
  const [advanture, setAdvanture] = useState<IAdvanture>();
  
  const [app, setApp] = useState<IAppData>(initialAppData);

  // useMemo(()=>{
  //   console.log(user);
    
  //   if(user.pwd !== unauthorizedUser.pwd){
  //     setUser({...testUser});
  //   }
  // },[user])

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
    setApp({...temp});
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
   * USER
   ****************/
  const setUserData = (newValue: TUpdateUser) => {
    console.log(newValue);
    let key: keyof TUpdateUser;

    for (key in newValue) {
      if (
        !Object.prototype.hasOwnProperty.call(user, key) ||
        !Object.prototype.hasOwnProperty.call(newValue, key)
      ) return false;
    }
    
    if(newValue.pwd){
      setUser({...testUser});
      return;
    }
    // const cloneObject = JSON.parse(JSON.stringify(temp.error))
    setUser(prev=>({...prev, ...newValue}));
  };

  const getUserData =  { ...user };

  const logout = () => {
    setUserData(unauthorizedUser);
    serverPostRequest({
      type: LIST_OF_POST_REQ_TYPES.LOGOUT,
    });
  };

  /****************
   * ADVANTURES
   ****************/
  const selectAdvanture = (id: string) => {
    setAppData({});
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
    <ErrorBoundary errorHandler={requestError}>
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
          toggleInterfaceTheme,
          getInterfaceTheme,
          getAppData,
          getLoading,
          getAppStatus
        }}
        {...props}
      />
    </ErrorBoundary>
  );
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const useApp = () => useContext(AppContext);

export default AppProvider;
