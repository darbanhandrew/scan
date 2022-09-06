import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonRouterOutlet } from "@ionic/react";
import { useState } from "react";
import { Redirect, Route } from "react-router-dom";

import Login from "../pages/Login";
import { IonReactRouter } from "@ionic/react-router";
// import Menu from "../components/menu";
import TabBar from "../components/tab-bar";
import { languageOutline } from "ionicons/icons";
import useConfig from "../hooks/useConfig";


const Routes = () => {

	
	const { locale, onChangeLocale, onChangeLocaleAndRTL } = useConfig();
	const [language, setLanguage] = useState<string>(locale);

	const changeLocale = (locale: string) => {
		onChangeLocale(locale);
		setLanguage(locale);
		console.log(locale);
	};

	return (
		<IonContent>
			<IonFab vertical="top" horizontal="end" slot="fixed">
				<IonFabButton>
					<IonIcon icon={languageOutline} />
				</IonFabButton>
				<IonFabList>
					<IonFabButton
						{...(language === 'en' && { color: 'primary' })}
						onClick={() => changeLocale('en')}
					>
						En
					</IonFabButton>
					<IonFabButton
						{...(language === 'ru' && { color: 'primary' })}
						onClick={() => changeLocale('ru')}
					>
						Ru
					</IonFabButton>
					<IonFabButton
						{...(language === 'uz-Latn-UZ' && { color: 'primary' })}
						onClick={() => changeLocale('uz-Latn-UZ')}
					>
						Uzb
					</IonFabButton>
					<IonFabButton
						{...(language === 'uz-Cyrl-UZ' && { color: 'primary' })}
						onClick={() => changeLocale('uz-Cyrl-UZ')}
					>
						Узб
					</IonFabButton>
				</IonFabList>
			</IonFab>
			<IonReactRouter>
				{/* <Menu /> */}
				<IonRouterOutlet id="main">

					<Route path="/tabs" component={TabBar} />
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>
				</IonRouterOutlet>

				{/* <Route render={() => authContext.auth.userType === null ? <Redirect to="/login" /> : <Redirect to={`/${authContext.auth.prefix || 'stock'}/home`} />} /> */}
			</IonReactRouter>
		</IonContent>
	);
}

export default Routes;