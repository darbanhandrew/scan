import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonIcon, IonLabel, IonToggle } from "@ionic/react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useHistory } from 'react-router';
import { moon } from 'ionicons/icons';


const Menu: React.FC = () => {

	const authContext = useContext(AuthContext);
	const history = useHistory();

	const toggleDarkModeHandler = () => {
		document.body.classList.toggle("dark");
	};

	return (
		<IonMenu side="start" menuId="first">
			<IonHeader>
				<IonToolbar>
					<IonIcon slot="start" icon={moon} />
					<IonLabel>Dark Mode</IonLabel>
					<IonToggle
						slot="end"
						name="darkMode"
						onIonChange={toggleDarkModeHandler}
					/>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					<IonItem>
						<IonButton
							onClick={() => {
								if (authContext.auth.userType) {
									console.log(authContext.auth.userType, 'logged out');
									authContext.auth.logout();
									history.push('/login');
								} else {
									history.push('/login')
								}
							}
							}
							style={{ width: '100%' }}
							color={authContext.auth.userType ? 'danger' : 'primary'}
						>
							{authContext.auth.userType ? 'Logout' : 'Login'}
						</IonButton>
					</IonItem>

				</IonList>
			</IonContent>
		</IonMenu>
	);

}

export default Menu;