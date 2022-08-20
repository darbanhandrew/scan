import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import AuthContext from "../context/AuthContext";


const ProtectedRoute = ({ component, access, exact, ...rest }: { component: JSX.Element; access: string | null; exact: boolean | undefined; path: string }) => {

	const authContext = useContext(AuthContext);
	const { auth } = authContext;

	if (auth.userType === null || auth.userType === access) {
		return <Route {...rest}>{component}</Route>;
	}
	return (<Redirect to="/login" />);
};

export default ProtectedRoute;