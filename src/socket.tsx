// <reference path="socket.io-client" />

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
// import * as socketIoClient from "socket.io-client";
import { CLIENT, SERVER } from "./assets/config";
import { EVENTS } from "./assets/constants";

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

export default SocketProvider;
