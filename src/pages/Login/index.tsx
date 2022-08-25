
import {
	IonButton,
	IonImg,
	IonInput,
	IonLabel,
	IonPage,
	IonText
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";
import "./login.css";
import FrappeClient, { FrappeRequestManager } from '../../util/FrappeNode';
import StyledInput from "../../theme/components/Input";
// import AxiosClient from '../../config/AxiosConfig';

const Login: React.FC = () => {

	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();

	const history = useHistory();
	const authContext = useContext(AuthContext);


	// const login = (user: string, prefix: string) => {

	// 	authContext.auth.login(user, prefix);
	// 	history.push("/tabs");
	// }

	const login = async () => {

		await FrappeRequestManager.listDocuments('Account');

		if (username !== "" && username !== undefined && password !== "" && password !== undefined) {

			// const loginData = AxiosClient.post('https://dev.realagroerp.uz/api/method/login', { usr: username, pwd: password });
			// console.log(loginData);
			const resp = await new FrappeClient().authenticate(username, password)
			console.log(resp);
			if (resp?.data.full_name) {
				authContext.auth.login('stock-manager', 'stock');
				history.push("/tabs");
			}
			
		}
	}

	return (
		<IonPage className="container">
			<div className="form-container">
				{/* <div>
					<IonText style={{ width: '100%', textAlign: 'center' }}>Which user you want to login as?</IonText>
				</div>
				<div>
					<IonButton color="warning" style={{ width: '100%' }} onClick={() => login('stock-manager', 'stock')}>Warehouse Manager</IonButton>
				</div>
				<div>
					<IonButton color="secondary" style={{ width: '100%' }} onClick={() => login('lab-manager', 'lab')}>Lab Manager</IonButton>
				</div>
				<div>
					<IonButton style={{ width: '100%' }} onClick={() => login('accountant', 'accountant')}>Accountant</IonButton>
				</div> */}
				<div className="single-item-container">
					<IonImg src="../assets/logo4.svg" slot="" />
				</div>
				<div className="single-item-container">
					<IonText style={{ width: '100%', textAlign: 'center'}}><h4>Real Agro ERP</h4></IonText>
				</div>
				<div className="item-container">
					<IonLabel>Username</IonLabel>
					<StyledInput
						value={username}
						placeholder="Username"

						onIonChange={e => setUsername(e.detail.value || '')}
					/>
				</div>
				<div className="item-container">
					<IonLabel>Password</IonLabel>
					<StyledInput

						value={password}
						placeholder="Password"
						type="password"
						onIonChange={e => setPassword(e.detail.value || '')}
					/>
				</div>
				<div className="single-item-container">
					<IonButton color="primary" style={{ width: '100%' }} onClick={() => login()}>Login</IonButton>
				</div>
			</div>
		</IonPage>
	);
};

export default Login;
