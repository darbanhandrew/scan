import {
	IonCard,
	IonCardContent,
	IonCol,
	IonGrid,
	IonIcon,
	IonPage,
	IonRow,
	IonText
} from "@ionic/react";
import { archiveOutline, hourglassOutline } from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
	return (
		<IonPage className="homePage">
			<IonGrid className="gridContainer">
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent className="card">
								<IonIcon icon={hourglassOutline} className="icon" />
								<IonText color="dark">
									<h4>Request Overtime or Leave</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={archiveOutline} className="icon" />
								<IonText color="dark">
									<h4>Salary</h4>
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
