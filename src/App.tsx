import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonTitle,
	IonToolbar,
	setupIonicReact,
	IonToggle,
	IonItem
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Scan from "./pages/Scan/Scan";
import Truck from './pages/Truck';
import Login from './pages/Login';
import ReceiptList from './pages/ReceiptList';
import Receipt from './pages/Receipt';
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { Provider } from 'react-redux';
import { store } from "./store";

/* Theme variables */
import "./theme/variables.css";
import { homeOutline, scanOutline, moon, listOutline } from "ionicons/icons";
setupIonicReact();

const App: React.FC = () => {

	const toggleDarkModeHandler = () => {
		document.body.classList.toggle("dark");
	};
	return (
		<IonApp>
			<Provider store={store}>
				<IonReactRouter>
					<IonHeader>
						<IonToolbar>
							<IonItem lines="none">
								<IonTitle slot="start">Real Agro ERP</IonTitle>
								<IonItem slot="end" lines="none">
									<IonIcon slot="start" icon={moon} />
									<IonLabel>Dark Mode</IonLabel>
									<IonToggle
										slot="end"
										name="darkMode"
										onIonChange={toggleDarkModeHandler}
									/>
								</IonItem>
							</IonItem>

						</IonToolbar>
					</IonHeader>
					<IonContent>
						<IonTabs>
							<IonRouterOutlet>
								<Route exact path="/home">
									<Home />
								</Route>
								<Route exact path="/receiptList">
									<ReceiptList />
								</Route>
								<Route exact path="/receipt/:index">
									<Receipt />
								</Route>
								{/* <Route exact path="/check-out/:index">
									<CheckOut />
								</Route> */}
								<Route exact path="/scan">
									<Scan />
								</Route>
								<Route exact path="/truck">
									<Truck />
								</Route>
								<Route exact path="/login">
									<Login />
								</Route>
								{/* <Route exact path="/home">
								<Home />
							</Route>
							<Route exact path="/home">
								<Home />
							</Route>
							<Route exact path="/home">
								<Home />
							</Route> */}
								<Route exact path="/">
									<Redirect to="/home" />
								</Route>

							</IonRouterOutlet>
							<IonTabBar slot="bottom">
								<IonTabButton tab="home" href="/home">
									<IonIcon icon={homeOutline} />
									<IonLabel>Home</IonLabel>
								</IonTabButton>
								<IonTabButton tab="receiptList" href="/receiptList">
									<IonIcon icon={listOutline} />
									<IonLabel>List</IonLabel>
								</IonTabButton>
								<IonTabButton tab="scan" href="/scan">
									<IonIcon icon={scanOutline} />
									<IonLabel>Scan</IonLabel>
								</IonTabButton>
							</IonTabBar>
						</IonTabs>
					</IonContent>
				</IonReactRouter>
			</Provider>
		</IonApp>
	)
};

export default App;
