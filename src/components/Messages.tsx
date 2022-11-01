import { useRef } from "react";

function MessagesContainer() {
  return false;
  // const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  function handleSendMessage() {
    if(newMessageRef.current === null) return;
    const message: string = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    newMessageRef.current.value = "";
  }
}

export default MessagesContainer;