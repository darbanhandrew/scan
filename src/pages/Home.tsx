import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard routerLink="/scan/truck">
              <IonCardContent>
                <IonImg src="../assets/Truck.svg" />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard routerLink="/scan/sales">
              <IonCardContent>
                <IonImg src="../assets/Sales.svg" />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard routerLink="/scan/purchase">
              <IonCardContent>
                <IonImg src="../assets/Purchase.svg" />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard routerLink="/scan/maskan">
              <IonCardContent>
                <IonImg src="../assets/Maskan.svg" />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Home;
