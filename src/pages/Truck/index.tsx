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
import "./truck.css";

const Truck: React.FC = () => {
	return (
		<IonPage class="homePage">
			<IonGrid class="gridContainer">
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonImg class="imageContainer" src="../assets/Truck.svg" />
								<IonText color="dark">
									<h4>Receive Item</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/sales">
							<IonCardContent>
								<IonImg class="imageContainer" src="../assets/Sales.svg" />
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
								<IonImg class="imageContainer" src="../assets/Purchase.svg" />
								<IonText color="dark">
									<h4>Request Overtime or leave</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/maskan">
							<IonCardContent>
								<IonImg class="imageContainer" src="../assets/Maskan.svg" />
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

export default Truck;
