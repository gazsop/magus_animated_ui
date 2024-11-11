import { SERVER, CLIENT } from "@appTypes/shared_config";

export const NODE_ENV: "development" | "production" = "development";

export type TTransitionTime =
  | "0"
  | "75"
  | "100"
  | "150"
  | "200"
  | "300"
  | "500"
  | "700"
  | "1000";

export const transTime: TTransitionTime = "1000";

const devHost = "192.168.0.202";
const host = "testelem.hu";
const devPort = 4001;
const port = 6868;

export const CONFIG = {
  // @ts-ignore
  port: NODE_ENV === "production" ? port : devPort,
  // @ts-ignore
  host: NODE_ENV === "production" ? host : devHost,
};

export default CONFIG;
