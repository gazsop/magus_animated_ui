// import React from "react";
// import { Login } from "../components/pageLogin/PageLogin_FORMAL";
// import { Admin } from "../components/pageAdmin/Admin";
// import { USER } from "./constants";
// import { TNav } from "../types/nav";

// export const NAV: TNav = {
//   PAGES: [
//     {
//       TEXT: "Belépés",
//       HREF: "login",
//       RANG_REQ: USER.RANK.UNAUTH,
//       INDEX: true,
//       COMPONENT: <Login />,
//     },
//     {
//       TEXT: "admin",
//       HREF: "admin",
//       RANG_REQ: USER.RANK.ADMIN,
//       INDEX: false,
//       COMPONENT: <Admin />,
//     },
//   ],
//   DEFAULT: userRank => NAV.PAGES.find(item=>item.RANG_REQ === userRank) ?? NAV.PAGES[0]
// };
