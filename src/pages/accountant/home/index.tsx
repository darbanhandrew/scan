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
import { appsOutline, archiveOutline, attachOutline, calculatorOutline, cashOutline, cellularOutline, clipboardOutline, contractOutline, cubeOutline, homeOutline, hourglassOutline, listOutline, medkitOutline, menuOutline, paperPlaneOutline, peopleCircleOutline, personAddOutline, squareOutline } from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
	return (
		<IonPage className="homePage">
			<IonGrid className="gridContainer">
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={clipboardOutline} />
								<IonText color="dark">
									<h4>Invoices</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={calculatorOutline} />
								<IonText color="dark">
									<h4>General ledger</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={cashOutline} />
								<IonText color="dark">
									<h4>Payment entry</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={listOutline} />
								<IonText color="dark">
									<h4>Contracts</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={cellularOutline} />
								<IonText color="dark">
									<h4>Profit and loss</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={paperPlaneOutline} />
								<IonText color="dark">
									<h4>Balance sheet</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={menuOutline} />
								<IonText color="dark">
									<h4>Stock Ledger</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={appsOutline} />
								<IonText color="dark">
									<h4>Journal Entry</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={attachOutline} />
								<IonText color="dark">
									<h4>Loans</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={peopleCircleOutline} />
								<IonText color="dark">
									<h4>Payroll</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={contractOutline} />
								<IonText color="dark">
									<h4>employee</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={homeOutline} />
								<IonText color="dark">
									<h4>New department</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={personAddOutline} />
								<IonText color="dark">
									<h4>Customers</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={medkitOutline} />
								<IonText color="dark">
									<h4>Supplier</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={cubeOutline} />
								<IonText color="dark">
									<h4>Item</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={squareOutline} />
								<IonText color="dark">
									<h4>Asset</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol size="6">
						<IonCard routerLink="/truck">
							<IonCardContent>
								<IonIcon icon={hourglassOutline} />
								<IonText color="dark">
									<h4>Request Overtime or Leave</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent>
								<IonIcon icon={archiveOutline} />
								<IonText color="dark">
									<h4>My salary</h4>
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
