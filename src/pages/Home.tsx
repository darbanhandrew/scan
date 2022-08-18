import {
	IonCard,
	IonCardContent,
	IonCol,
	IonGrid,
	IonImg,
	IonItem,
	IonPage,
	IonRow,
	IonText
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
	return (
		<IonPage className="homePage">
			<IonGrid className="gridContainer">
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonImg className="imageContainer" src="../assets/Truck.svg" />
								<IonText color="dark">
									<h4>Receive Item</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonImg className="imageContainer" src="../assets/Sales.svg" />
								<IonText color="dark">
									<h4>Send Item</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/purchase">
							<IonCardContent>
								<IonImg className="imageContainer" src="../assets/Purchase.svg" />
								<IonText color="dark">
									<h4>Request Overtime or leave</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/maskan">
							<IonCardContent>
								<IonImg className="imageContainer" src="../assets/Maskan.svg" />
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
