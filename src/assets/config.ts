import {
  SERVER as SHARED_SERVER,
  CLIENT as SHARED_CLIENT,
} from "../../../shared/shared_config";

export const SERVER = {
  ...SHARED_SERVER,
};
export const CLIENT = {
  ...SHARED_CLIENT,
  SUPRESS_ERROR: true,
  SOCKET_CONNECTION: ["polling", "websocket"]
};
