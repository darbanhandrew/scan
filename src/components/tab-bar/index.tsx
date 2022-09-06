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

import ReadPlate from "../../pages/PlateScan";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


const TabBar: React.FC = () => {


	const authState = useSelector((state: RootState) => state.auth);

	return (
		<IonTabs>
			{/* <Menu /> */}
			<IonRouterOutlet id="tab">
				<Route exact path="/tabs/stock/home" render={(props) => authState.userType === 'stock-manager' ? <Home /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/stock/read-plate" render={(props) => authState.userType === 'stock-manager' ? <ReadPlate /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/stock/check-in" render={(props) => authState.userType === 'stock-manager' ? <Truck /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/receipt/:docname" render={(props) => authState.userType === 'stock-manager' ? <Receipt /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/check-out/:docname" render={(props) => authState.userType === 'stock-manager' ? <CheckOut /> : <Redirect to="/login" />} />


				<Route exact path="/tabs/send-item" render={(props) => authState.userType === 'stock-manager' ? <SendItem /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/send-item-dest/:docname" render={(props) => authState.userType === 'stock-manager' ? <SendItemDest /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/send-item-qr/:docname" render={(props) => authState.userType === 'stock-manager' ? <SendItemQR /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/scan-result/:docname" render={(props) => authState.userType === 'stock-manager' ? <ScanResult /> : <Redirect to="/login" />} />
				<Route exact path="/tabs/direct-driver/:docname" render={(props) => authState.userType === 'stock-manager' ? <DirectDriver /> : <Redirect to="/login" />} />


				<Route exact path="/tabs/accountant/home" render={(props) => authState.userType === 'accountant' ? <AccountantHome /> : <Redirect to="/login" />} />


				<Route exact path="/tabs/lab/home" render={(props) => authState.userType === 'lab-manager' ? <LabHome /> : <Redirect to="/login" />} />

				<Route exact path="/tabs/scan" render={(props) => authState.userType !== null ? <Scan /> : <Redirect to="/login" />} />

				<Route exact path="/tabs/list" render={(props) => authState.userType !== null ? <ReceiptList /> : <Redirect to="/login" />} />

				<Route exact path="/tabs">
					<Redirect to={`/tabs/${authState.prefix || 'stock'}/home`} />
				</Route>
				{/* <Route exact path="*" render={(props) => authState.userType !== null ? <Redirect to={`/tabs/${authState.prefix || 'stock'}/home`} /> : <Redirect to="/login" />} /> */}
			</IonRouterOutlet>

			<IonTabBar slot="bottom" color="primary">
				<IonTabButton tab="home" href={`/tabs/${authState.prefix || 'stock'}/home`}>
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