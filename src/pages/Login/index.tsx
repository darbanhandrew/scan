
import {
	IonIcon,
	IonImg,
	IonPage,
	IonText
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./login.css";
import FrappeClient from '../../util/FrappeNode';
import StyledInput from "../../theme/components/Input";
import StyledButton from "../../theme/components/Button";
import { arrowForward } from "ionicons/icons";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store";
// import AxiosClient from '../../config/AxiosConfig';

const Login: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();

	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();
	const intl = useIntl();

	const history = useHistory();


	const login = async (user: string, prefix: string) => {


		// 	history.push("/tabs");
		// }

		// const login = async () => {

		if (username !== "" && username !== undefined && password !== "" && password !== undefined) {

			// const loginData = AxiosClient.post('https://dev.realagroerp.uz/api/method/login', { usr: username, pwd: password });
			// console.log(loginData);
			const resp = await new FrappeClient().authenticate(username, password)
			console.log(resp);
			if (resp?.data.full_name) {
				dispatch.auth.login({ userType: user, prefix})
				// authContext.auth.login('stock-manager', 'stock');
				// authContext.auth.login('accountant', 'accountant');
				history.push("/tabs");
			}

		}
	};

	return (
		<IonPage className="container">
			<div className="form-container">
				<div className="single-item-container">
					<IonImg src="../assets/Logo.png" style={{ width: '50%' }} />
				</div>
				<div className="field-container">
					<div className="single-item-container">
						<IonText style={{ width: '100%', textAlign: 'center' }} color="primary">{intl.formatMessage({ id: "Log Into Real Agro Cotton", defaultMessage: "Log Into Real Agro Cotton" })}</IonText>
					</div>
					<div className="item-container">
						<StyledInput
							value={username}
							placeholder={intl.formatMessage({ id: "Username", defaultMessage: "Username" })}

							onIonChange={e => setUsername(e.detail.value || '')}
						/>
					</div>
					<div className="item-container">
						<StyledInput

							value={password}
							placeholder={intl.formatMessage({ id: "Password", defaultMessage: "Password" })}
							type="password"
							onIonChange={e => setPassword(e.detail.value || '')}
						/>
					</div>
					<div className="single-item-container">
						<StyledButton style={{ width: '100%' }} onClick={() => login('stock-manager', 'stock')}>
							{intl.formatMessage({ id: "Login", defaultMessage: "Login" })} As Stock Manager
						</StyledButton>
					</div>
					<div className="single-item-container">
						<StyledButton style={{ width: '100%' }} onClick={() => login('accountant', 'accountant')}>
							{intl.formatMessage({ id: "Login", defaultMessage: "Login" })} As Accountant
						</StyledButton>
					</div>
					<div className="single-item-container">
						<StyledButton style={{ width: '100%' }} onClick={() => login('lab-manager', 'lab')}>
							{intl.formatMessage({ id: "Login", defaultMessage: "Login" })} As Lab Manager
						</StyledButton>
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
