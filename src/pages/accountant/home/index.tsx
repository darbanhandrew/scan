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
							<IonCardContent className="card">
								<IonIcon icon={clipboardOutline} className="icon" />
								<IonText color="dark">
									<h4>Invoices</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={calculatorOutline} className="icon" />
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
							<IonCardContent className="card">
								<IonIcon icon={cashOutline} className="icon" />
								<IonText color="dark">
									<h4>Payment entry</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={listOutline} className="icon" />
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
							<IonCardContent className="card">
								<IonIcon icon={cellularOutline} className="icon" />
								<IonText color="dark">
									<h4>Profit and loss</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={paperPlaneOutline} className="icon" />
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
							<IonCardContent className="card">
								<IonIcon icon={menuOutline} className="icon" />
								<IonText color="dark">
									<h4>Stock Ledger</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={appsOutline} className="icon" />
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
							<IonCardContent className="card">
								<IonIcon icon={attachOutline} className="icon" />
								<IonText color="dark">
									<h4>Loans</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={peopleCircleOutline} className="icon" />
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
							<IonCardContent className="card">
								<IonIcon icon={contractOutline} className="icon" />
								<IonText color="dark">
									<h4>employee</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={homeOutline} className="icon" />
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
							<IonCardContent className="card">
								<IonIcon icon={personAddOutline} className="icon" />
								<IonText color="dark">
									<h4>Customers</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={medkitOutline} className="icon" />
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
							<IonCardContent className="card">
								<IonIcon icon={cubeOutline} className="icon" />
								<IonText color="dark">
									<h4>Item</h4>
								</IonText>
							</IonCardContent>
						</IonCard>
					</IonCol>
					<IonCol size="6">
						<IonCard routerLink="/send-item">
							<IonCardContent className="card">
								<IonIcon icon={squareOutline} className="icon" />
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
