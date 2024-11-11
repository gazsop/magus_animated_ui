import { useState } from "react";
import CONFIG from "../tec";
import { Application } from "@appTypes/shared_types";

function useRequest(controller: "users" | "adventures" | "characters") {
  let parsedController = controller.startsWith("/")
    ? controller.substring(1)
    : controller;
  parsedController = parsedController.endsWith("/")
    ? parsedController.substring(0, parsedController.length - 1)
    : parsedController;
  const [url, setUrl] = useState(
    CONFIG.host +
      ":" +
      CONFIG.port +
      "/" +
      (controller.charAt(controller.length - 1) === "/"
        ? controller
        : controller + "/")
  );
  const request = async <T = any>({
    endPoint,
    method = "POST",
    body,
  }: {
    endPoint: string;
    method?: "GET" | "POST";
    body?: any;
  }): Promise<Application.IResponseDataSuccess<T>> => {
    console.log(url);
    console.log(endPoint);
    let parsedEndPoint = endPoint.startsWith("/")
      ? endPoint.substring(1)
      : endPoint;
    parsedEndPoint = parsedEndPoint.endsWith("/")
      ? parsedEndPoint.substring(0, parsedEndPoint.length - 1)
      : parsedEndPoint;
    const response = await fetch("http://" + url + parsedEndPoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = (await response.json()) as
      | Application.IResponseDataSuccess<T>
      | Application.IResponseDataError<T>;

    if ("error" in result && result.error) {
      const errorString =
        "Network response was not ok: " + JSON.stringify(result);
      alert(errorString);
      throw new Error("Network response was not ok: " + JSON.stringify(result));
    }

    return result as Application.IResponseDataSuccess<T>;
  };

  return [request];
}

export default useRequest;
