import React from "react";
import { Advantures } from "../components/advantures/PageAdvantures";
import { Character } from "../components/character/PageCharacter";
import { Login } from "../components/login/PageLogin";
import { Monsters } from "../components/PageMonsters";
import { Spells } from "../components/PageSpells";
import { USER } from "./constants";

export type TPage = {
  TEXT: string;
  HREF: string;
  RANG_REQ: string;
  INDEX: boolean;
  COMPONENT: React.ReactElement;
};

export type TNavDefault = {
  HREF: string;
  COMPONENT: React.ReactElement;
};
export type TNav = {
  PAGES: TPage[];
  DEFAULT: (val: string) => TNavDefault;
};

export const NAV: TNav = {
  PAGES: [
    {
      TEXT: "Belépés",
      HREF: "login",
      RANG_REQ: USER.RANK.UNAUTH,
      INDEX: true,
      COMPONENT: <Login />,
    },
    {
      TEXT: "Karakter",
      HREF: "character",
      RANG_REQ: USER.RANK.USER,
      INDEX: false,
      COMPONENT: <Character />,
    },
    {
      TEXT: "Kalandok",
      HREF: "advantures",
      RANG_REQ: USER.RANK.USER,
      INDEX: false,
      COMPONENT: <Advantures />,
    },
    {
      TEXT: "Varázslatok",
      HREF: "spells",
      RANG_REQ: USER.RANK.USER,
      INDEX: false,
      COMPONENT: <Spells />,
    },
    {
      TEXT: "Lények",
      HREF: "monster",
      RANG_REQ: USER.RANK.ADMIN,
      INDEX: false,
      COMPONENT: <Monsters />,
    },
  ],
  DEFAULT: (userRank) => {
    if (userRank === USER.RANK.USER)
      return {
        HREF: "advantures",
        COMPONENT: <Advantures />,
      };
    return {
      HREF: "login",
      COMPONENT: <Login />,
    };
  },
};
