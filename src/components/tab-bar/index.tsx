import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, listOutline, scanOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router-dom";
import AccountantHome from '../../pages/accountant/home';
import CheckOut from "../../pages/CheckOut";
import DirectDriver from "../../pages/DirectDriver";
import Home from "../../pages/Home";
import LabHome from '../../pages/lab/home';
import Receipt from "../../pages/Receipt";
import ReceiptList from "../../pages/ReceiptList";
import Scan from "../../pages/Scan/Scan";
import ScanResult from "../../pages/ScanResult";
import SendItem from "../../pages/SendItem";
import SendItemDest from "../../pages/SendItemDest";
import SendItemQR from "../../pages/SendItemQR";
import Truck from "../../pages/Truck";
// import Menu from "../menu";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ReadPlate from "../../pages/PlateScan";


const TabBar: React.FC = () => {

	const authContext = useContext(AuthContext);

	return (
		<IonTabs>
			{/* <Menu /> */}
			<IonRouterOutlet id="tab">
				<Route exact path="/tabs/stock/home" render={(props) => authContext.auth.userType === 'stock-manager' ? <Home /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/stock/read-plate" render={(props) => authContext.auth.userType === 'stock-manager' ? <ReadPlate /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/stock/check-in" render={(props) => authContext.auth.userType === 'stock-manager' ? <Truck /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/receipt/:index" render={(props) => {
					console.log(authContext.auth.userType === 'stock-manager', authContext.auth.userType)
					return authContext.auth.userType === 'stock-manager' ? <Receipt /> : <Redirect to="/login" />}} />
				<Route exact path="/tabs/check-out/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <CheckOut /> : <Redirect to="/login" />} />


				<Route exact path="/tabs/send-item" render={(props) => authContext.auth.userType === 'stock-manager' ? <SendItem /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/send-item-dest/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <SendItemDest /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/send-item-qr/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <SendItemQR /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/scan-result/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <ScanResult /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/direct-driver/:index" render={(props) => authContext.auth.userType === 'stock-manager' ? <DirectDriver /> : <Redirect to="/login" />} />


				<Route exact path="/tabs/accountant/home" render={(props) => authContext.auth.userType === 'accountant' ? <AccountantHome /> : <Redirect to="/login" />} />


				<Route exact path="/tabs/lab/home" render={(props) => authContext.auth.userType === 'lab-manager' ? <LabHome /> : <Redirect to="/login" />} />

				<Route exact path="/tabs/scan" render={(props) => authContext.auth.userType !== null ? <Scan /> : <Redirect to="/login" />} />

				<Route exact path="/tabs/list" render={(props) => authContext.auth.userType !== null ? <ReceiptList /> : <Redirect to="/login" />} />

				<Route exact path="/tabs">
					<Redirect to={`/tabs/${authContext.auth.prefix || 'stock'}/home`} />
				</Route>
				{/* <Route exact path="*" render={(props) => authContext.auth.userType !== null ? <Redirect to={`/tabs/${authContext.auth.prefix || 'stock'}/home`} /> : <Redirect to="/login" />} /> */}
			</IonRouterOutlet>

			<IonTabBar slot="bottom" color="secondary">
				<IonTabButton tab="home" href={`/tabs/${authContext.auth.prefix || 'stock'}/home`}>
					<IonIcon icon={homeOutline} />
					<IonLabel>Home</IonLabel>
				</IonTabButton>
				<IonTabButton tab="list" href="/tabs/list">
					<IonIcon icon={listOutline} />
					<IonLabel>List</IonLabel>
				</IonTabButton>
				<IonTabButton tab="scan" href="/tabs/scan">
					<IonIcon icon={scanOutline} />
					<IonLabel>Scan</IonLabel>
				</IonTabButton>
			</IonTabBar>


		</IonTabs>
	);
};

export default TabBar;