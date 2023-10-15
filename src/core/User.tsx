import { useState } from "react";
import { users } from "../data/_testUser";
import { Adventure, Application, IRegexErrorArray, Optional, User } from "../types/common";

interface IUser extends User.IUserData {
  setUser: (val: Optional<User.IUserData, keyof User.IUserData>) => void;
  getUser: () => User.IUserData;
  logout: () => void;
}

const unauthorizedUser: User.IUserData = {
  id: Application.PLACEHOLDER.STRING as string,
  uid: Application.PLACEHOLDER.STRING as string,
  pwd: Application.PLACEHOLDER.STRING as string,
  keepLoggedIn: false,
  rank: User.USER_RANK.UNAUTH
};

export const UserHook = (
  userInitData: User.IUserData
) => {
  const [user, setUser] = useState<User.IUserData>(userInitData);

  const setUserData = (val: Optional<User.IUserData, keyof User.IUserData>) => {
    setUser(prev => ({ ...prev, ...val }));
  }
  const getUserData = () => this;
  const logout = () => setUser(unauthorizedUser);
  const getAllUsers = () => users;
  const validateUId = (uidInput: string) => {
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
  const validatePwd = (pwdInput: string) => {
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
  return {
    setUser: setUserData,
    getUser: getUserData,
    getAllUsers,
    validateUId,
    validatePwd,
  };
}