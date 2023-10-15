import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { CLIENT, SERVER } from "../assets/config";
import { Application } from "../types/common";


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

  const serverPostRequest: Application.TRequest = async (inputData, callback = ()=>{}) =>
    await serverRequest
      .post("", inputData)
      .then((response) => callback(response))
      .catch((error) => alert(JSON.stringify(error)));

  const serverPostError: Application.TRequest = async (inputData, callback = Function) =>
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

export type TMsg = {
  message: string;
  username: string;
  time: Date;
}[];

const socket = io(SERVER.GET_URI, {
  transports: [],
});

function SocketProvider() {
  // console.log("socketprovider loaded");

  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<TMsg>([
    {
      username: "You",
      message: "asd",
      time: new Date(),
    },
  ]);

  const openSocket = () => {
    socket.io.opts.transports = CLIENT.SOCKET_CONNECTION;
  };

  const closeSocket = () => {
    socket.io.opts.transports = [];
  };

  return {
    socket,
  };
}