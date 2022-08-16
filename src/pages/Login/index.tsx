import {
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonSegment,
	IonSegmentButton
} from "@ionic/react";
import { useState } from "react";
import "./login.css";
// import AxiosClient from '../../config/AxiosConfig';

const Login: React.FC = () => {

	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();

	const login = async () => {

		if (username !== "" && username !== undefined && password !== "" && password !== undefined) {
			
			// const loginData = AxiosClient.post('https://dev.realagroerp.uz/api/method/login', { usr: username, pwd: password });
			// console.log(loginData);
		}
	}

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem>
					<IonLabel>Username:</IonLabel>
					<IonInput value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value || '')} />
				</IonItem>
				<IonItem>
					<IonLabel>Password:</IonLabel>
					<IonInput value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value || '')} />
				</IonItem>
				<IonItem>
					<IonButton onClick={() => login()}>
						Save
					</IonButton>
				</IonItem>
			</IonList>
		</IonPage>
	);
};

export default Login;
