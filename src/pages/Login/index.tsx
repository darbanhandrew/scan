import {
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonSegment,
	IonSegmentButton,
	IonText
} from "@ionic/react";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";
import "./login.css";
// import AxiosClient from '../../config/AxiosConfig';

const Login: React.FC = () => {

	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();

	const history = useHistory();
	const authContext = useContext(AuthContext);
	
	
	const login = (user: string, prefix: string) => {

		authContext.auth.login(user, prefix);
		history.push("/home");
	}

	// const login = async () => {

	// 	if (username !== "" && username !== undefined && password !== "" && password !== undefined) {

	// 		// const loginData = AxiosClient.post('https://dev.realagroerp.uz/api/method/login', { usr: username, pwd: password });
	// 		// console.log(loginData);
	// 	}
	// }

	return (
		<IonPage className="container">
			<IonList>
				<IonItem>
					<IonText style={{ width: '100%', textAlign: 'center' }}>Which user you want to login as?</IonText>
				</IonItem>
				<IonItem>
					<IonButton color="warning" style={{ width: '100%' }} onClick={() => login('stock-manager', 'stock')}>Warehouse Manager</IonButton>
				</IonItem>
				<IonItem>
					<IonButton color="secondary" style={{ width: '100%' }} onClick={() => login('lab-manager', 'lab')}>Lab Manager</IonButton>
				</IonItem>
				<IonItem>
					<IonButton style={{ width: '100%' }} onClick={() => login('accountant', 'accountant')}>Accountant</IonButton>
				</IonItem>
			</IonList>
		</IonPage>
	);
};

export default Login;
