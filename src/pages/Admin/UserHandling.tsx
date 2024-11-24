import { SingleValue } from "react-select";
import { User } from "@appTypes/shared_types";
import { FlexCol, FlexRow } from "../../components/Flex";
import {
  ButtonUnq,
  HTMLOptionData,
  InputUnq,
  SelectUnq,
} from "../../components/GeneralElements";
import { useEffect } from "react";
import { useState } from "react";
import useRequest from "../../hooks/request";

function UserHandling() {
  const [users, setUsers] = useState<User.IUserDataClient[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>(-1);
  const [pwd, setPwd] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(true);

  const [requestUser] = useRequest("users");

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser && users.length > 0) setSelectedUser(0);
  }, [users]);

  function getAllUsers() {
    requestUser<User.IUserDataClient[]>({
      endPoint: "/getAll",
    })
      .then((response) => {
        console.log(response);
        setUsers([
          {
            uid: "",
            name: "",
            rank: User.USER_RANK.UNAUTH,
          },
          ...response.data,
        ]);
      })
      .catch((error) => {
        console.error("Failed to fetch users: ", error);
      });
  }

  function getPropState(type: "empty" | "new" | "both"): boolean {
    //isempty, isnew, isboth
    switch (type) {
      case "empty": {
        console.log("empty");
        return selectedUser === -1;
      }
      case "new": {
        console.log("new");
        return selectedUser === 0;
      }
      case "both": {
        console.log("both");
        return selectedUser === -1 || selectedUser === 0;
      }
      default:
        return false;
    }
  }

  const className = "";
  if (users.length === 0) return <FlexCol className={className}></FlexCol>;
  return (
    <FlexCol className={className}>
      <label onClick={() => setDisplay(!display)} className={`text-center`}>
        USERS
      </label>
      {display && (
        <>
          <SelectUnq
            id={"admin-userSelect"}
            label={"Select User"}
            value={
              getPropState("empty")
                ? {
                    label: "",
                    value: "",
                  }
                : getPropState("new")
                ? {
                    label: users[selectedUser].name || "New User",
                    value: users[selectedUser].uid || "new",
                  }
                : {
                    label: users[selectedUser].name,
                    value: users[selectedUser].uid,
                  }
            }
            onChange={(e: SingleValue<HTMLOptionData<string>>) => {
              debugger;
              if (!e) return;
              const userIndex = users.findIndex((user) => user.uid === e.value);
              setSelectedUser(userIndex === -1 ? 0 : userIndex);
            }}
            optionData={[
              ...users.map((user, index) => {
                if (index === 0)
                  return {
                    label: "New User",
                    value: "new",
                  };
                return {
                  label: user.name,
                  value: user.uid,
                };
              }),
            ]}
            className="m-1"
            disabled={false}
          />
          <InputUnq
            id={"admin-uid"}
            label={"UID"}
            value={getPropState("empty") ? "" : users[selectedUser].uid}
            onBlur={(e) => {
              const elem = e.target as HTMLInputElement;
              const val = elem.value as string;
              const selectedUserIndex = users.findIndex(
                (user) => user.uid === users[selectedUser].uid
              );
              if (selectedUser) {
                setSelectedUser(selectedUserIndex);
              }
              setUsers(
                users.map((user) => {
                  if (user.uid === users[selectedUser].uid)
                    return { ...user, uid: val };
                  return user;
                })
              );
            }}
            className="m-1"
            disabled={getPropState("empty") ? true : false}
          />
          <InputUnq
            id={"admin-name"}
            label={"Name"}
            value={getPropState("empty") ? "" : users[selectedUser].name}
            onBlur={(e) => {
              const elem = e.target as HTMLInputElement;
              const val = elem.value as string;
              const selectedUserIndex = users.findIndex(
                (user) => user.uid === users[selectedUser].uid
              );
              if (selectedUser) {
                setSelectedUser(selectedUserIndex);
              }
              setUsers(
                users.map((user) => {
                  if (user.uid === users[selectedUser].uid) {
                    return { ...user, name: val };
                  }
                  return user;
                })
              );
            }}
            className="m-1"
            disabled={getPropState("empty") ? true : false}
          />
          <InputUnq
            id={"admin-pwd"}
            label={"Pwd"}
            value={""}
            type="password"
            className="m-1"
            placeholder={getPropState("new") ? "********" : ""}
            onBlur={(e) => {
              const elem = e.target as HTMLInputElement;
              const val = elem.value as string;
              setPwd(val);
            }}
            disabled={getPropState("empty") ? true : false}
          />
          <FlexRow className="flex-wrap">
            <ButtonUnq
              id={"admin-get-all"}
              onClick={() => getAllUsers()}
              className="m-1"
            >
              GET ALL USERS
            </ButtonUnq>
            <ButtonUnq
              id={"admin-update"}
              onClick={() => {
                console.log(pwd);
                const body: User.IUserDataClient = {
                  uid: users[selectedUser]?.uid,
                  name: users[selectedUser]?.name,
                  pwd: pwd,
                };
                if (pwd) body.pwd = pwd;
                requestUser({
                  endPoint: "/update",
                  body: body,
                }).then((res) => {
                  console.log(res);
                  setUsers(
                    users.map((user) => {
                      if (user.uid === users[selectedUser].uid) {
                        return body;
                      }
                      return user;
                    })
                  );
                });
              }}
              className="m-1"
              disabled={users[selectedUser]?.uid === "new"}
            >
              UPDATE USER
            </ButtonUnq>
            <ButtonUnq
              id={"admin-delete"}
              onClick={() => {
                if (!confirm("Are you sure you want to delete this user?"))
                  return;
                requestUser({
                  endPoint: "/delete",
                  body: {
                    uid: users[selectedUser]?.uid,
                  },
                }).then((res) => {
                  console.log(res);
                  setUsers(
                    users.filter((user) => user.uid !== users[selectedUser].uid)
                  );
                });
              }}
              className="m-1"
              disabled={users[selectedUser]?.uid === "new"}
            >
              DELETE USER
            </ButtonUnq>
            <ButtonUnq
              id={"admin-create"}
              onClick={() => {
                const body: User.IUserDataClient = {
                  uid: users[selectedUser]?.uid,
                  name: users[selectedUser]?.name,
                  pwd: pwd,
                };
                if (pwd) {
                  body.pwd = pwd;
                }
                if (body.uid === "new") {
                  alert("Please enter a valid UID");
                  return;
                }
                if (!body.pwd) {
                  alert("Please enter a password");
                  return;
                }
                if (!body.name) {
                  alert("Please enter a name");
                  return;
                }
                requestUser({
                  endPoint: "/create",
                  body: body,
                }).then((res) => {
                  getAllUsers();
                  console.log(res);
                });
              }}
              className="m-1"
            >
              CREATE USER
            </ButtonUnq>
          </FlexRow>
        </>
      )}
    </FlexCol>
  );
}

export default UserHandling;
