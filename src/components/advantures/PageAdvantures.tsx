import { useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Slideshow, ICard } from "../../utils/slideshow";
import { useApp } from "../../context/app.context";
import { linkedList } from "../../utils/linkedList";
import { CustomDate } from "../../utils/formatDate";
import { Id } from "../../utils/getId";

export type TAdvantureGrid = {
  classes?: string[] | [];
  text?: string;
};

interface IChar {
  name: string;
  race: string;
  class: string;
  lvl: number;
}
interface INote {
  id: number;
  date: string;
  sendBy: string;
  text: string;
}
export interface IAdvanture {
  id: number;
  name: string;
  notes: INote[];
  char: IChar;
  creationDate: string;
  lastModified: string;
}

const testAdventure: IAdvanture[] = [
  {
    id: 1,
    name: "teszt1.",
    creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
    lastModified: CustomDate.formatDate("2020-02-02 01:02:03"),
    notes: [
      {
        id: 1,
        date: CustomDate.formatDate("2020-02-02 01:02:03"),
        sendBy: "Csicska",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 2,
        date: CustomDate.formatDate("2021-03-03 03:04:05"),
        sendBy: "Csicska2",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    char: {
      name: "Béla1",
      lvl: 17,
      race: "Ork",
      class: "Varázsló",
    },
  },
  {
    id: 2,
    name: "teszt2.",
    creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
    lastModified: CustomDate.formatDate("2020-02-02 01:02:03"),
    notes: [
      {
        id: 21,
        date: CustomDate.formatDate("2011-06-06 08:09:08"),
        sendBy: "Csicska3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 22,
        date: CustomDate.formatDate("2010-02-07 01:09:08"),
        sendBy: "Csicska4",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    char: {
      name: "Béla2",
      lvl: 17,
      race: "Ork",
      class: "Varázsló",
    },
  },
  {
    id: 3,
    name: "Sárkányok vihara",
    creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
    lastModified: CustomDate.formatDate("2020-02-02 01:02:03"),
    notes: [
      {
        id: 31,
        date: CustomDate.formatDate("2011-06-06 08:09:08"),
        sendBy: "Csicska3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 32,
        date: CustomDate.formatDate("2010-02-07 01:09:08"),
        sendBy: "Csicska4",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    char: {
      name: "Béla3",
      lvl: 17,
      race: "Ork",
      class: "Varázsló",
    },
  },
  {
    id: 4,
    name: "Sárkányok vihara2",
    creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
    lastModified: CustomDate.formatDate("2020-02-02 01:02:03"),
    notes: [
      {
        id: 41,
        date: CustomDate.formatDate("2011-06-06 08:09:08"),
        sendBy: "Csicska3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 42,
        date: CustomDate.formatDate("2010-02-07 01:09:08"),
        sendBy: "Csicska4",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    char: {
      name: "Béla3",
      lvl: 165,
      race: "Ork",
      class: "Varázsló",
    },
  },
];


export function Advantures() {
  const { userGetAllAdvantures, selectAdvanture } = useApp();
  const numberOfAdvanturesInARow = 3;

  const getSlideshowData = () => {
    return testAdventure.map<ICard>((item) => ({
      header: item.name,
      secondHeader: (
        <>
          <p className="flex-grow-1">
            Kaland kezdete:<br></br>
            {item.creationDate}
          </p>
          <p className="flex-grow-1">{item.lastModified}</p>
        </>
      ),
      thirdHeader: (
        <p>{`Karakter neve: ${item.char.name}, szint: ${item.char.lvl}, faj: ${item.char.race}, kaszt: ${item.char.class}`}</p>
      ),
      textBody: (
        <>
          {item.notes.map((note, index) => {
            return (
              <div className=".card-note" key={Id.getRand()}>
                <div className="card-note-header">
                  <p>{note.date}</p>
                  <p>{note.sendBy}</p>
                </div>
                <div className="card-note-body">
                  <p>{note.text}</p>
                </div>
              </div>
            );
          })}
        </>
      ),
    }));
  };
  const advantureList = new linkedList<ICard>(getSlideshowData(), "circular");

  return <Slideshow data={advantureList} />;
}
