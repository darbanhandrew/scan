
import {
	IonButton,
	IonIcon,
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
import StyledButton from "../../theme/components/Button";
import { arrowForward } from "ionicons/icons";
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
					<IonImg src="../assets/Logo.png" style={{ width: '50%' }} />
				</div>
				<div className="field-container">
					<div className="single-item-container">
						<IonText style={{ width: '100%', textAlign: 'center' }} color="primary">Log Into Real Agro Cotton</IonText>
					</div>
					<div className="item-container">
						<StyledInput
							value={username}
							placeholder="Username"

							onIonChange={e => setUsername(e.detail.value || '')}
						/>
					</div>
					<div className="item-container">
						<StyledInput

							value={password}
							placeholder="Password"
							type="password"
							onIonChange={e => setPassword(e.detail.value || '')}
						/>
					</div>
					<div className="single-item-container">
						<StyledButton style={{ width: '100%' }} onClick={() => login()}>Login</StyledButton>
					</div>
				</div>
				<div></div>
				<div className="frappe-oauth-container">
					<IonText color="primary">Sign in with</IonText>
					<IonImg src="../assets/FrappeLogo.png" />

					<div className="arrow-icon-container"><IonIcon icon={arrowForward} color="primary" class="arrow-icon" /></div>
				</div>
			</div>
		</IonPage>
	);
};

export default Login;
