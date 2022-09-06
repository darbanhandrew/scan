import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonIcon, IonLabel, IonToggle } from "@ionic/react";
import { useHistory } from 'react-router';
import { moon } from 'ionicons/icons';
import { Dispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';


const Menu: React.FC = () => {

	const history = useHistory();
	const dispatch = useDispatch<Dispatch>();
	const authState = useSelector((state: RootState) => state.auth);

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
								if (authState.userType) {
									console.log(authState.userType, 'logged out');
									dispatch.auth.logout();
									history.push('/login');
								} else {
									history.push('/login')
								}
							}
							}
							style={{ width: '100%' }}
							color={authState.userType ? 'danger' : 'primary'}
						>
							{authState.userType ? 'Logout' : 'Login'}
						</IonButton>
					</IonItem>

				</IonList>
			</IonContent>
		</IonMenu>
	);

}

export default Menu;