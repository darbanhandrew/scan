import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../store";


const ProtectedRoute = ({ component, access, exact, ...rest }: { component: JSX.Element; access: string | null; exact: boolean | undefined; path: string }) => {

	const authState = useSelector((state: RootState) => state.auth);

	if (authState.userType === null || authState.userType === access) {
		return <Route {...rest}>{component}</Route>;
	}
	return (<Redirect to="/login" />);
};

export default ProtectedRoute;