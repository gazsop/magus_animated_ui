import { PLACEHOLDER, STATES, USER } from "../assets/constants";
import { users } from "../data/_testUser";
import { IAdventure, IRegexErrorArray, Optional } from "../types/common";
import { IUserData, TUpdateUser } from "../types/user";

interface IUser extends IUserData {
  setUser: (val: Optional<IUserData, keyof IUserData>) => void;
  getUser: () => IUserData;
  logout: () => void;
}

const unauthorizedUser: IUserData = {
  id: PLACEHOLDER.STRING,
  uid: PLACEHOLDER.STRING,
  pwd: PLACEHOLDER.STRING,
  keepLoggedIn: STATES.BOOLEAN.OFF,
  rank: USER.RANK.UNAUTH,
};

export class User implements IUser{
  id: string;
  uid: string;
  pwd: string;
  keepLoggedIn: boolean;
  rank: string;
  constructor(initVal: TUpdateUser = {}){
    this.id = initVal.id ?? unauthorizedUser.id;
    this.uid = initVal.uid ?? unauthorizedUser.uid;
    this.pwd = initVal.pwd ?? unauthorizedUser.pwd;
    this.keepLoggedIn = initVal.keepLoggedIn ?? unauthorizedUser.keepLoggedIn;
    this.rank = initVal.rank ?? unauthorizedUser.rank;
  }

  public setUser = (val: Optional<IUserData, keyof IUserData>) => Object.assign(this, val);
  public getUser = () => this;
  public logout = () => this.setUser(unauthorizedUser);
  public static getAllUsers = () => users;
  public static validateUId = (uidInput: string) => {
    const uid = {
      minLength: 4,
      maxLength: 36,
    };
    const validationArray: IRegexErrorArray[] = [
      {
        value: new RegExp(`^(.){${uid.minLength},${uid.maxLength}}$`, "i").test(
          uidInput
        ),
        msg: `${uid.minLength} és ${uid.maxLength} karakter között kell lennie!`,
      },
      {
        value: new RegExp(`^$|^[A-Za-z\.\@0-9áÁéÉűŰúŐóÓüÜöÖíÍ]+$`, "i").test(
          uidInput
        ),
        msg: `Nem megfelelő karakter. Engedélyezett karakterek: a-z, 0-9, .@`,
      },
    ];
    let errorString: null | IRegexErrorArray[] =
      validationArray.filter((regexObject) => {
        if (!regexObject.value) return regexObject.msg;
      }) ?? null;
    return errorString ? [...errorString] : errorString;
  };
  public static validatePwd = (pwdInput: string) => {
    console.log(pwdInput);
    const pwd = {
      minLength: 4,
      maxLength: 36,
    };
    const validationArray: IRegexErrorArray[] = [
      {
        value: new RegExp(`^(.){${pwd.minLength},${pwd.maxLength}}$`, "i").test(
          pwdInput
        ),
        msg: `${pwd.minLength} és ${pwd.maxLength} karakter között kell lennie!`,
      },
      {
        value: new RegExp(`^$|^[A-Za-z\.\@0-9áÁéÉűŰúŐóÓüÜöÖíÍ]+$`, "i").test(
          pwdInput
        ),
        msg: `Nem megfelelő karakter. Engedélyezett karakterek: magyar ABC kis és nagybetűi, ".","@".`,
      },
    ];
    let errorString: null | IRegexErrorArray[] =
      validationArray.filter((regexObject) => {
        if (!regexObject.value) return regexObject.msg;
      }) ?? null;
    return errorString ? [...errorString] : errorString;
  };
}