import React from "react";
import { Col, InputGroup, Row } from "react-bootstrap";
import { Id } from "../../utils/getId";
import "../../assets/css/game.css";
import { CustomDate } from "../../utils/formatDate";
import charInventory from "../../assets/char_inventory.jpg"
import { Inventory } from "./components/Inventory";
import { Adventure, Application, PLACEHOLDER } from "@appTypes/magus_app_types";

const char = {
  primStats: [
    {
      name: "Akaratérő",
      val: 16,
    },
    {
      name: "Állóképesség",
      val: 15,
    },
    {
      name: "Asztrál",
      val: 15,
    },
    {
      name: "Egészség",
      val: 17,
    },
    {
      name: "Erő",
      val: 13,
    },
    {
      name: "Gyorsaság",
      val: 19,
    },
    {
      name: "Intelligencia",
      val: 9,
    },
    {
      name: "Szépség",
      val: 13,
    },
    {
      name: "Ügyesség",
      val: 18,
    },
  ],
  hp: [
    { name: "Max ÉP", val: 4 },
    { name: "Jelenlegi ÉP", val: 4 },
    { name: "Max FPval", val: 18 },
    { name: "Jelenlegi FP", val: 18 },
    { name: "FP/szint", val: "k6+5" },
  ],
  rp: [
    {
      name: "Név",
      val: PLACEHOLDER.STRING,
    },
    {
      name: "Nem",
      val: PLACEHOLDER.STRING,
    },
    {
      name: "Jellem",
      val: PLACEHOLDER.STRING,
    },
    {
      name: "Vallás",
      val: PLACEHOLDER.STRING,
    },
    {
      name: "Szülőföld",
      val: PLACEHOLDER.STRING,
    },
  ],
  xp: {
    currentXp: 0,
    nextLvlXp: 1000,
    lvl: 1,
  },
  resource: {
    name: "Mana",
    max: 100,
    current: 100,
    gainPerLvl: "k6+5",
  },
  money: [
    {
      name: "Arany",
      val: 1,
    },
    {
      name: "Ezüst",
      val: 1,
    },
    {
      name: "Réz",
      val: 1,
    },
  ],
};

const adventureNotes = [
  {
    id: 1,
    date: CustomDate.formatDate("2020-02-02 01:02:03"),
    sendBy: "Csicska",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  {
    id: 2,
    date: CustomDate.formatDate("2021-02-02 01:02:03"),
    sendBy: "Csicska1",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  {
    id: 3,
    date: CustomDate.formatDate("2022-02-02 01:02:03"),
    sendBy: "Csicska2",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  {
    id: 4,
    date: CustomDate.formatDate("2023-02-02 01:02:03"),
    sendBy: "Csicska3",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  
];

function Resource() {
  return (
    <table>
      <tbody>
        <tr>
          <td>{char.resource.name}</td>
        </tr>
        <tr>
          <td>Max {char.resource.max}</td>
        </tr>
        <tr>
          <td>Jelenlegi {char.resource.current}</td>
        </tr>
        <tr>
          <td>/lvl{char.resource.gainPerLvl}</td>
        </tr>
      </tbody>
    </table>
  );
}

function Hm() {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Alap</th>
          <th>Páncél</th>
          <th>Összesen</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>KE</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>TÉ</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>VÉ</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>CÉ</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  );
}

function Hp() {
  return (
    <div
      className="flex-column"
      style={{
        backgroundColor: "green",
      }}
    >
      {char.hp.map((item) => (
        <table>
          <tbody>
            <tr>
              <td>{item.name}</td>
              <td>{item.val}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

function Rp() {
  return (
    <div
      className="flex-column"
      style={{
        backgroundColor: "blue",
      }}
    >
      {char.rp.map((item) => (
        <table>
          <tbody>
            <tr>
              <td>{item.name}</td>
              <td>{item.val}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

function Xp() {
  return (
    <table>
      <tbody>
        <tr>
          <td>Szint {char.xp.lvl}</td>
        </tr>
        <tr>
          <td>Jelenlegi xp {char.xp.currentXp}</td>
        </tr>
        <tr>
          <td>XP kövi szinthez {char.xp.nextLvlXp}</td>
        </tr>
      </tbody>
    </table>
  );
}

function PrimStats() {
  return (
    <div className="flex-column">
      {char.primStats.map((item) => (
        <table>
          <tbody>
            <tr>
              <td>{item.name}</td>
              <td>{item.val}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

function Notes(){
  return (
    <div className="note-container">
      <div className="notes-list">
      {adventureNotes.map(note=>(
        <div className="note">{note.date}: {note.sendBy}<br />{note.text}</div>
      ))}
      </div>
      <div className="new-notes">
        <textarea className="new-notes"></textarea>
        <input type="button" value="Küldés" />
      </div>
    </div>
  )
}
export function Character(): React.ReactElement {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <PrimStats />
          </td>
          <td>
            <Rp />
            <Hp />
          </td>
          <td>
            <Hm />
            <Xp />
            <Resource />
          </td>
          <td>
            <img src={charInventory}/>
          </td>
          <td>
          </td>
          <td><Notes/></td>
        </tr>
      </tbody>
    </table>
  );
}
