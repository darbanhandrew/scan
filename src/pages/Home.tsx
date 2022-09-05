import {
	IonCard,
	IonCardContent,
	IonCol,
	IonGrid,
	IonImg,
	IonPage,
	IonRow,
	IonText
} from "@ionic/react";
import { useIntl } from "react-intl";
import "./Home.css";

const Home: React.FC = () => {

	const intl = useIntl();

	return (
		<IonPage className="home-page">
			<div className="heading-container">
				<IonText color="primary" class="heading">
					{/* Home */}
					{intl.formatMessage({ id: "Home", defaultMessage: "Home" })}z
				</IonText>
			</div>
			<IonGrid className="grid-container">
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/tabs/stock/read-plate" class="ion-card">
							<IonCardContent class="ion-card-content">
								<IonImg className="image-container" src="../assets/HomeIcons/ReceiveItem.svg" />
								<IonText color="primary" class="item-text">
									{/* Receive Item */}
									{intl.formatMessage({ id: "Receive Item", defaultMessage: "Receive Item" })}
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/tabs/send-item" class="ion-card">
							<IonCardContent class="ion-card-content">
								<IonImg className="image-container" src="../assets/HomeIcons/SendItem.svg" />
								<IonText color="primary" class="item-text">
									{/* Send Item */}
									{intl.formatMessage({ id: "Send Item", defaultMessage: "Send Item" })}
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/purchase" class="ion-card">
							<IonCardContent class="ion-card-content">
								<IonImg className="image-container" src="../assets/HomeIcons/RequestOvertime.svg" />
								<IonText color="primary" class="item-text">
									{/* Request Overtime or leave */}
									{intl.formatMessage({ id: "Request Overtime or Leave", defaultMessage: "Request Overtime or Leave" })}
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/maskan" class="ion-card">
							<IonCardContent class="ion-card-content">
								<IonImg className="image-container" src="../assets/HomeIcons/Salary.svg" />
								<IonText color="primary" class="item-text">
									{/* Salary */}
									{intl.formatMessage({ id: "Salary", defaultMessage: "Salary" })}
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
			</IonGrid>
		</IonPage>
	);
};

export default Home;
