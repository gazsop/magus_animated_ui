import { useRef, useState } from "react";
import { FlexCol, FlexRow } from "../components/Flex";
import dummyNotes from "../data/dummyNotes";
import ListChecklistIcon from "../components/icons/general/ListChecklistIcon";
import EditWritePenIcon from "../components/icons/general/EditWritePenIcon";
import PlusIcon from "../components/icons/general/PlusIcon";
import RndContainer from "../components/RndContainer";
import { TextAreaUnq } from "../components/GeneralElements";

export type TNote = {
  id: number;
  text: string;
  createDate: Date;
  createdBy: string;
  updated: {
    date: Date;
    by: string;
    prev: string;
  }[];
};

function Notes({
  close,
  isOpen,
  selectWindow,
  classes,
}: {
  close: () => void;
  isOpen: boolean;
  selectWindow: () => void;
  classes?: string;
}) {
  const [display, setDisplay] = useState<"list" | "editor">("list");
  const [notes, setNotes] = useState<TNote[]>(dummyNotes());

  const currentNoteMsgRef = useRef<string>(notes[notes.length]?.text || "");

  console.log(notes);
  const saveNote = () => {
    console.log("Saving note");
  };

  const updateNote = (msg: string) => {
    currentNoteMsgRef.current = msg;
  };

  const NotesElement = () => {
    return (
      <FlexCol
        className={`p-1 grow relative nowrap overflow-x-hidden overflow-y-auto cursor-pointer user-select-none`}
        //onClick={selectWindow}
      >
        {notes.map((note) => {
          return (
            <FlexRow
              key={note.id}
              className="p-1 justify-between items-center fancy-container"
              preventWrap={true}
            >
              <div className="grow overflow-ellipsis whitespace-nowrap overflow-hidden">
                {note.text}
              </div>
              <p class="whitespace-nowrap mr-2">{`${note.createDate.toLocaleDateString()}, ${
                note.createdBy
              }`}</p>
              <EditWritePenIcon
                className="h-4 mx-1 w-4 shrink-0"
                onClick={() => {
                  setDisplay((prev) => "editor");
                  currentNoteMsgRef.current = note.text;
                }}
              />
            </FlexRow>
          );
        })}
        <FlexRow className="justify-center">
          <PlusIcon className="w-4 h-4" />
        </FlexRow>
      </FlexCol>
    );
  };

  if (!isOpen) return <></>;

  return (
    <RndContainer
      id="notes-container"
      aditionalIcons={
        display === "editor" ? (
          <ListChecklistIcon
            className="h-4 m-1 w-6 cursor-pointer"
            onClick={() => setDisplay("list")}
          />
        ) : null
      }
      close={close}
      label="Notes"
      onDragStart={() => console.log("Drag Start")}
      className={classes}
    >
      {display === "list" ? (
        <NotesElement />
      ) : (
        <TextAreaUnq
          id="notes"
          value={currentNoteMsgRef.current}
          onChange={updateNote}
          onSave={saveNote}
          disabled={false}
          placeholder="Write your notes here"
          className="bg-white bg-opacity-100 p-1 grow m-1 grow"
          layout="flex-row"
          element="editor"
        />
      )}
    </RndContainer>
  );
}

export default Notes;
