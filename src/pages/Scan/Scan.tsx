import React from "react";
import {
  IonButton,
  IonCardContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import "./Scan.css";
import { QrReader } from "react-qr-reader";

const Scan: React.FC = () => {
  const [data, setData] = React.useState("Not Found");
  return (
    <IonPage>
      <QrReader
              onResult={(result, error) => {
                  if (!!result) {
                      setData(result?.getText());
                      window.location.href = result?.getText();
                  }

                  if (!!error) {
                      console.info(error);
                  }
              } } constraints={{ facingMode: 'user' }}      />
      <p>{data}</p>
    </IonPage>
  );
};

export default Scan;
