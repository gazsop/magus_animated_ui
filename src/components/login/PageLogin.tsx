import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/app.context";
import { Button, Form, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";
import PageLoginInput from "./PageLoginInput";
import { Navigate } from "react-router-dom";

export interface IRegexErrorArray {
  value: boolean;
  msg: string;
}

const LOGIN_PAGE_STATES = {
  uidInput: {
    name: "uid-input",
    headerText: "Bejelentkezés",
    labelText: "Írd be a felhasználóneved / e-mail címed!",
    inputType: "text",
    nextState: "pwd-input",
    nextBtnText: "Tovább",
    placeholder: "Felhasználónév/e-mail cím"
  },
  pwdInput: {
    name: "pwd-input",
    headerText: "Bejelentkezés",
    labelText: "Írd be a jelszavadat!",
    inputType: "password",
    nextState: "advanture",
    nextBtnText: "Bejelentkezés",
    placeholder: "Jelszó"
  },
  forgotLogin: {
    name: "forgot-login",
    headerText: "Elfelejtett jelszó",
    labelText: "Írd be az e-mail címed!",
    inputType: "text",
    nextState: "uid-input",
    nextBtnText: "Új jelszót kérek",
    placeholder: "E-mail cím"
  },
  registration: {
    name: "registration",
    headerText: "Regisztráció",
    labelText: "Írd be az e-mail címed!",
    inputType: "text",
    nextState: "uid-input",
    nextBtnText: "Tovább",
    placeholder: "E-mail cím"
  },
  advanture: {
    name: "advanture",
    headerText: "advanture",
    labelText: "advanture",
    inputType: "text",
    nextState: "uid-input",
    nextBtnText: "advanture",
    placeholder: "Felhasználónév/e-mail cím"
  },
};

export function Login() {
  const { getUserData, setUserData } = useApp();
  const [pageState, setPageState] = useState<
    typeof LOGIN_PAGE_STATES[keyof typeof LOGIN_PAGE_STATES]
  >(LOGIN_PAGE_STATES.uidInput);
  const [loginError, setLoginError] = useState<IRegexErrorArray[] | null>(null);

  const keepUserLoggedInRef = useRef<HTMLInputElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);

  /*
  GENERAL HANDLERS
  */
  const handleLoginBtn = (
    e: React.MouseEvent | React.KeyboardEvent,
    targetState: typeof LOGIN_PAGE_STATES[keyof typeof LOGIN_PAGE_STATES]["name"] = LOGIN_PAGE_STATES
      .pwdInput.name
  ) => {
    console.log("asd");
    console.log(targetState);
    
    
    e.preventDefault();

    const userInput =
      !loginInputRef.current?.value && loginInputRef.current?.value !== ""
        ? ""
        : loginInputRef.current!.value;
    switch (targetState) {
      case LOGIN_PAGE_STATES.pwdInput.name: {
        const validationUid = validateUId(userInput).filter(
          (error) => !error.value
        );
        if (validationUid.length !== 0) setLoginError(validationUid);
        else {
          loginInputRef.current && (loginInputRef.current.value = "");
          setPageState({ ...LOGIN_PAGE_STATES.pwdInput });
          setLoginError(null);
          setUserData({uid: userInput})
        }

        break;
      }
      case LOGIN_PAGE_STATES.registration.name: {
        loginInputRef.current && (loginInputRef.current.value = "");
        setPageState({ ...LOGIN_PAGE_STATES.registration });
        setLoginError(null);
        break;
      }
      case LOGIN_PAGE_STATES.forgotLogin.name: {
        loginInputRef.current && (loginInputRef.current.value = "");
        setPageState({ ...LOGIN_PAGE_STATES.forgotLogin });
        setLoginError(null);
        break;
      }
      case LOGIN_PAGE_STATES.advanture.name: {
        const validationPwd = validatePwd(userInput).filter(
          (error) => !error.value
        );
        if (validationPwd.length !== 0) setLoginError(validationPwd);
        else {
          loginInputRef.current && (loginInputRef.current.value = "");
          setPageState({ ...LOGIN_PAGE_STATES.advanture });
          setLoginError(null);
          setUserData({pwd: userInput})
        }
        break;
      }
      default:
        setPageState({ ...LOGIN_PAGE_STATES.uidInput });
        setLoginError(null);
        break;
    }
  };
  /*
  PAGE_STATE = UIDINPUT HANDLERS
  */
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

  /*
  PAGE_STATE = PWDINPUT HANDLERS
  */

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

  /*
  PAGE_STATE ERROR HANDLERS
  */

  return (
    <div
      className={[
        "d-flex",
        "login-form",
        "flex-wrap",
        "py-4",
        "px-3",
        "mx-auto",
        "justify-content-center",
        "align-items-center",
        "align-self-center",
      ].join(" ")}
    >
      <Image src={logo} className="w-100 h-auto" />
      <h1>{pageState.headerText}</h1>
      <PageLoginInput
        labelText={pageState.labelText}
        setLoginError={setLoginError}
        loginError={loginError}
        userUIdRef={loginInputRef}
        inputType={pageState.inputType}
        content=""
        onEnterKeyDown={(e: React.KeyboardEvent) =>
          handleLoginBtn(e, pageState.nextState)
        }
        placeholder={pageState.placeholder}
      />
      {/* <LinkContainer to={"/"} className="login-link w-100 mt-2">
        <Nav.Link disabled>{"Nincs felhasználód?"}</Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/"} className="login-link w-100 my-2">
        <Nav.Link disabled>{"Nem tudsz belépni?"}</Nav.Link>
      </LinkContainer> */}
      <Button
        className="bg-transparent w-100 mt-3 border-0 text-start p-0"
        onClick={e => handleLoginBtn(e, LOGIN_PAGE_STATES.registration.name)}
        disabled
      >
        Nincs felhasználód?
      </Button>
      <Button
        className="bg-transparent w-100 mt-3 border-0 text-start p-0"
        onClick={e => handleLoginBtn(e, LOGIN_PAGE_STATES.forgotLogin.name)}
        disabled
      >
        Nem tudsz belépni?
      </Button>
      <Form.Group className="mt-3 w-100" controlId="login-keep-logged-in">
        <Form.Check
          type="checkbox"
          checked={getUserData.keepLoggedIn}
          ref={keepUserLoggedInRef}
          label="Maradjak bejelentkezve"
          disabled
        />
      </Form.Group>
      <div className="d-flex w-100 mt-3">
      {pageState.name !== LOGIN_PAGE_STATES.uidInput.name && (
        <Button
          variant="secondary"
          type="submit"
          className="w-100 mx-1"
          onClick={(e) => handleLoginBtn(e, LOGIN_PAGE_STATES.uidInput.name)}
        >
          Vissza
        </Button>
      )}
      <Button
        variant="secondary"
        type="submit"
        className="w-100 mx-1"
        onClick={
          pageState.name === LOGIN_PAGE_STATES.uidInput.name
            ? (e) => handleLoginBtn(e, LOGIN_PAGE_STATES.pwdInput.name)
            : (e) => handleLoginBtn(e, LOGIN_PAGE_STATES.advanture.name)
        }
      >
        {pageState.nextBtnText}
      </Button>
      </div>
    </div>
  );
}
