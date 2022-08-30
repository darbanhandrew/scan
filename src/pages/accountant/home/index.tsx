import {
	IonCard,
	IonCardContent,
	IonCol,
	IonGrid,
	IonIcon,
	IonImg,
	IonPage,
	IonRow,
	IonText
} from "@ionic/react";
import "./Home.css";
import HomeInfo from "../../../assets/Home.json"; 

const Home: React.FC = () => {

	const createColumn = (title: string, icon: string, link: string) => {
		
		return (
			<IonCol size="6" key={title}>
				<IonCard onClick={() => window.open(link, "_blank")} class="ion-card">
					<IonCardContent class="ion-card-content">
						<IonImg className="image-container" src={icon} />
						<IonText color="primary" class="item-text">
							{title}
						</IonText>
					</IonCardContent>
				</IonCard>
			</IonCol>
		);
	};

	const createRows = () => {

		// create double file rows
		let index = 0;
		let rows: JSX.Element[] = [];
		let temp: JSX.Element[] = [];
		while (index < HomeInfo.accountant.length) {

			temp.push(createColumn(HomeInfo.accountant[index].title, HomeInfo.accountant[index].icon, HomeInfo.accountant[index].link));
			if (temp.length === 2) {
				const t = [...temp];
				rows.push(<IonRow key={index}>{t}</IonRow>);
				temp = [];
			}
			index++;
		}
		if (temp.length > 0) {
			rows.push(<IonRow key={index}>{temp}</IonRow>);
		}
		return rows;
		
	}


	return (
		<IonPage className="homePage">
			<IonGrid className="grid-container">
				{createRows()}
			</IonGrid>

		</IonPage>
	);
};

export default Home;
