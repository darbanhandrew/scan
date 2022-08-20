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

	console.log('here')

	return (
		<IonPage>
			<IonButton>Test</IonButton>
		</IonPage>
	);
};

export default Login;
