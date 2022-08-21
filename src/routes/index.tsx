import { IonContent, IonRouterOutlet } from "@ionic/react";
import { useContext } from "react";
import { Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Login from "../pages/Login";
import { IonReactRouter } from "@ionic/react-router";
import Menu from "../components/menu";
import TabBar from "../components/tab-bar";


const Routes = () => {

	const authContext = useContext(AuthContext);

	return (
		<IonContent>
			<IonReactRouter>
				<Menu />
				<IonRouterOutlet id="main">

					<Route path="/tabs" component={TabBar} />
					<Route exact path="/login">
						<Login />
					</Route>
				</IonRouterOutlet>

				{/* <Route render={() => authContext.auth.userType === null ? <Redirect to="/login" /> : <Redirect to={`/${authContext.auth.prefix || 'stock'}/home`} />} /> */}



			</IonReactRouter>
		</IonContent>
	);
}

export default Routes;