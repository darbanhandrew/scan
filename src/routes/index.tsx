import { IonContent, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, listOutline, scanOutline, } from "ionicons/icons";
import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router";
import AuthContext from "../context/AuthContext";
import CheckOut from "../pages/CheckOut";
import DirectDriver from "../pages/DirectDriver";
import Home from "../pages/Home";
import LabHome from '../pages/lab/home';
import AccountantHome from '../pages/accountant/home';
import Login from "../pages/Login";
import Receipt from "../pages/Receipt";
import ReceiptList from "../pages/ReceiptList";
import Scan from "../pages/Scan/Scan";
import ScanResult from "../pages/ScanResult";
import SendItem from "../pages/SendItem";
import SendItemDest from "../pages/SendItemDest";
import SendItemQR from "../pages/SendItemQR";
import ProtectedRoute from "./ProtectedRoute";
import { IonReactRouter } from "@ionic/react-router";


const Routes = () => {

	const authContext = useContext(AuthContext);

	useEffect(() => {
		console.log('authContext', authContext.auth.userType);
	}, [authContext]);

	return (
		<IonReactRouter>
			<IonContent>
				<IonRouterOutlet>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route render={() => authContext.auth.userType === null ? <Redirect to="/login" /> : <Redirect to={`/${authContext.auth.prefix || 'stock'}/home`} />} />
					
				</IonRouterOutlet>
				{authContext.auth.userType !== null && (
					<IonTabs>
						<IonRouterOutlet>
							<Route exact path="/stock/home" render={(props) => authContext.auth.userType === 'stock-manager' ? <Home /> : <Redirect to="/login" />} />

							<Route exact path="/receipt/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <Receipt /> : <Redirect to="/login" />} />
							<Route exact path="/check-out/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <CheckOut /> : <Redirect to="/login" />} />

							<Route exact path="/send-item" render={(props) => authContext.auth.userType === 'stock-manager' ? <SendItem /> : <Redirect to="/login" />} />
							<Route exact path="/send-item-dest/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <SendItemDest /> : <Redirect to="/login" />} />
							<Route exact path="/send-item-qr/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <SendItemQR /> : <Redirect to="/login" />} />
							<Route exact path="/scan-result/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <ScanResult /> : <Redirect to="/login" />} />
							<Route exact path="/direct-driver/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <DirectDriver /> : <Redirect to="/login" />} />


							<Route exact path="/accountant/home" render={(props) => authContext.auth.userType === 'accountant' ? <AccountantHome /> : <Redirect to="/login" />} />


							<Route exact path="/lab/home" render={(props) => authContext.auth.userType === 'lab-manager' ? <LabHome /> : <Redirect to="/login" />} />

							<Route exact path="/scan" render={(props) => authContext.auth.userType !== null ? <Scan /> : <Redirect to="/login" />} />

							<Route exact path="/list" render={(props) => authContext.auth.userType !== null ? <ReceiptList /> : <Redirect to="/login" />} />

							<Route path="*">
								<Redirect to={`/${authContext.auth.prefix || 'stock'}/home`} />
							</Route>
						</IonRouterOutlet>

						<IonTabBar slot="bottom">
							<IonTabButton tab="home" href={`/${authContext.auth.prefix || 'stock'}/home`}>
								<IonIcon icon={homeOutline} />
								<IonLabel>Home</IonLabel>
							</IonTabButton>
							<IonTabButton tab="list" href="/list">
								<IonIcon icon={listOutline} />
								<IonLabel>List</IonLabel>
							</IonTabButton>
							<IonTabButton tab="scan" href="/scan">
								<IonIcon icon={scanOutline} />
								<IonLabel>Scan</IonLabel>
							</IonTabButton>
						</IonTabBar>


					</IonTabs>
				)}
			</IonContent>
		</IonReactRouter>
	);
}

export default Routes;