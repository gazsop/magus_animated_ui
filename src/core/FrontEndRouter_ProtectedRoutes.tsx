import { Navigate, Outlet } from "react-router-dom";
import { routesArray } from "./FrontEndRouter";
import { User } from "@appTypes/magus_app_types";

// const REDIRECT_PATH_UNATH = NAV.PAGES.find((value: TPage)=>(value.RANG_REQ == USER.RANK.UNAUTH));

export const ProtectedRoute = ({
	isAllowed,
	children,
}: {
	isAllowed: boolean;
	children: React.ReactElement;
}) => {
	if (isAllowed) return children ? children : <Outlet />;
	// return <Navigate to="/login" replace />;
	return <Navigate to={
		routesArray.find((value)=>(value.userRangReq == User.USER_RANK.USER))?.path ?? "/login"
	} replace />;
};
