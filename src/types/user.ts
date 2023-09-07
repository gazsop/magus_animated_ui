import { USER } from "../assets/constants";
import { User } from "../core/User";
import { Optional } from "./common";

export type TUserRank = typeof USER.RANK[keyof typeof USER.RANK];

export type TUpdateUser = User | Optional<IUserData, keyof IUserData>;

export interface IUserData {
  id: string;
  uid: string;
  pwd: string;
  rank: TUserRank;
  keepLoggedIn: boolean;
}