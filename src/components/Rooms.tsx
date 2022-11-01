import { useRef } from "react";
import {EVENTS} from "../assets/constants";


function RoomsContainer() {
  return false;
  // const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleCreateRoom() {
    //get the room name
    if(newRoomRef.current === null) return;
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    // socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key: string) {
  //   if (key === roomId) return;

  //   socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder="Room name" />
        <button className="cta" onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>

      <ul>
        {
          // rooms.map((room, index) => {
          //   return (
          //     <div key={index}>
          //       <button
          //         title={`Join ${room.name}`}
          //         onClick={() => handleJoinRoom(room.name)}
          //       >
          //         {rooms[index].name}
          //       </button>
          //     </div>
          //   );
          // })
        }
      </ul>
    </nav>
  );
}

export default RoomsContainer;
