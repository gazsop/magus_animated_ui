import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { CLIENT, SERVER } from "./assets/config";
import { USER, PLACEHOLDER, LISTOF_POST_REQ_TYPES } from "./assets/constants";
import SocketProvider from "./socket";
import { IRequestData, IResponseData, TRequest } from "./assets/types";


function RouterProvider() {
  const { socket } = SocketProvider();
  const serverRequest = axios.create({
    baseURL: SERVER.GET_URI,
    method: "post",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/json",
      Accept: "application/json",
      timeout: "2500",
      maxRedirects: 0,
    },
    responseType: "json",
  });

  const setWsConnection = () => {};

  const serverWsMsg = () => {};

  const serverPostRequest: TRequest = async (inputData, callback = ()=>{}) =>
    await serverRequest
      .post("", inputData)
      .then((response) => response)
      .catch((error) => alert(JSON.stringify(error)));

  const serverPostError: TRequest = async (inputData, callback = Function) =>
    await serverRequest
      .post(SERVER.GET_ERROR_URI ?? SERVER.GET_URI, inputData)
      .then((response) => response)
      .catch((error) => alert(JSON.stringify(error)));

  return {
    serverPostRequest,
    serverPostError,
  };
}

export default RouterProvider;
