import React from "react";
import { Login } from "../components/pageLogin/PageLogin_FORMAL";
import { Admin } from "../components/pageAdmin/Admin";
import { TNav } from "../types/nav";
import { User } from '@appTypes/magus_app_types';

export const NAV: TNav = {
  PAGES: [
    {
      TEXT: "Belépés",
      HREF: "login",
      RANG_REQ: User.USER_RANK.UNAUTH,
      INDEX: true,
      COMPONENT: <Login />,
    },
    {
      TEXT: "admin",
      HREF: "admin",
      RANG_REQ: User.USER_RANK.ADMIN,
      INDEX: false,
      COMPONENT: <Admin />,
    },
  ],
  DEFAULT: userRank => NAV.PAGES.find(item=>item.RANG_REQ === userRank) ?? NAV.PAGES[0]
};
