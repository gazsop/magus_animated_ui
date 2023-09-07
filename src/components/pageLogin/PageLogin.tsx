import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../core/App";
import { Button, Form, Image, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";
import PageLoginInput from "./PageLoginInput";
import { Navigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { IRegexErrorArray } from "../../types/common";
import { User } from "../../core/User";
import login from "../../assets/imgs/bg/login.png";
import guard from "../../assets/imgs/guard.png";
import guard2 from "../../assets/imgs/guard2.png";

const LOGIN_PAGE_STATES = {
  uidInput: [0,1,2,3,4,5]
};

type TPageState = typeof LOGIN_PAGE_STATES[keyof typeof LOGIN_PAGE_STATES][number];

export function Login() {
  const { getUser, setUser } = useApp();
  const [loginError, setLoginError] = useState<IRegexErrorArray[] | null>(null);
  const [pageState, setPageState] = useState<TPageState>(
    LOGIN_PAGE_STATES.uidInput[0]
  );

  const keepUserLoggedInRef = useRef<HTMLInputElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);

  //image preload

  const handleLoginBtn = (
    e: React.MouseEvent | React.KeyboardEvent,
    targetState: TPageState = LOGIN_PAGE_STATES.uidInput[0]
  ) => {

  };

  const passwordField = () => {
    const row = 3;
    const col = 3;
    return (
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
        {[...Array(row)].map((_, i) => (
          <div className="d-flex flex-wrap flex-row justify-content-center align-items-center" key={`inputRow${i}`}>
            {[...Array(col)].map((_, j) => (
              <div className="d-flex flex-wrap justify-content-center align-items-center" key={`inputCell${i}${j}`}>
                <div
                  className="form-control input-field-btn"
                  data-value={i * col + j + 1}
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "transparent",
                    fontSize: "4rem"
                  }}
                  >
                  {i * col + j + 1}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const LoginContent = () => {
    switch (pageState) {
      case LOGIN_PAGE_STATES.uidInput[0]: {
        return (<input type="text" placeholder="név"/>);
      }
      default: {
        return (<input type="text" placeholder="név"/>);
      }
    }
  };

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
      style={{ 
        height: "100vh",
        width: "100vw",
       }}
    >
      <Image src={ login } 
        style={{
          position: "absolute",
          top: 0,
          zIndex: -1,
          minWidth: "100vw",
          aspectRatio: "21/9",
        }}
      />
      <LoginContent />
    </div>
  );
}
