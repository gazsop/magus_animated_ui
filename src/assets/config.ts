import {
  SERVER as SHARED_SERVER,
  CLIENT as SHARED_CLIENT,
} from "@appTypes/shared_config";

export const SERVER = {
  ...SHARED_SERVER,
};
export const CLIENT = {
  ...SHARED_CLIENT,
  SUPRESS_ERROR: true,
  SOCKET_CONNECTION: ["polling", "websocket"]
};

export const GAME = {
  PAGESTATE: {
    adventure: "adv",
    CHAR: "char",
    SPELLS: "spell",
    SECONDARYSTATS: "secStats"
  }
}