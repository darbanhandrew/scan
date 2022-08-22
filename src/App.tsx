import {
	IonApp,
	IonHeader,
	IonIcon,
	IonLabel,
	IonTitle,
	IonToolbar,
	setupIonicReact,
	IonToggle,
	IonItem,
	IonMenuButton,
	IonButtons
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import { moon } from "ionicons/icons";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";
// import Menu from "./components/menu";
setupIonicReact();

const App: React.FC = () => {

	return (
		<Provider store={store}>
			<AuthProvider>
				<IonApp>
					<IonHeader>
						<IonToolbar>
							<IonTitle>Real Agro ERP</IonTitle>
							{/* <IonButtons slot="end" style={{ width: '40px', height: '40px'}}>
								<IonMenuButton />
							</IonButtons>
							 */}
						</IonToolbar>
					</IonHeader>
					<Routes />

				</IonApp>
			</AuthProvider >
		</Provider>
	)
};

export default App;
