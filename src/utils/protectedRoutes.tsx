import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NAV, TPage } from "../assets/nav";
import { USER } from "../assets/constants";

const REDIRECT_PATH_UNATH = NAV.PAGES.find((value: TPage)=>(value.RANG_REQ == USER.RANK.UNAUTH));

export const ProtectedRoute = ({
    isAllowed,
    children
  }: {
    isAllowed: boolean,
    children: React.ReactElement
  }) => {
    if (isAllowed) return children ? children : <Outlet />;
    return <Navigate to={NAV.DEFAULT(USER.RANK.USER).HREF} replace />;
  };