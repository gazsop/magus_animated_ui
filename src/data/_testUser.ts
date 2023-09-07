import { STATES, USER } from "../assets/constants";
import { IUserData } from "../types/user";

export const users: IUserData[] = [
  {
    id: "2",
    uid: "testUser",
    pwd: "pwd",
    keepLoggedIn: STATES.BOOLEAN.OFF,
    rank: USER.RANK.USER,
  },
  {
    id: "1",
    uid: "testAdmin",
    pwd: "pwd",
    keepLoggedIn: STATES.BOOLEAN.OFF,
    rank: USER.RANK.ADMIN,
  }
];