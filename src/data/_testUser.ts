import { User } from "@/magus_app_types";


export const users: User.IUserData[] = [
  {
    id: "2",
    uid: "testUser",
    pwd: "pwd",
    keepLoggedIn: false,
    rank: User.USER_RANK.USER,
  },
  {
    id: "1",
    uid: "testAdmin",
    pwd: "pwd",
    keepLoggedIn: false,
    rank: User.USER_RANK.ADMIN,
  }
];