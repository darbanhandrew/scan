import { useEffect, useState } from 'react';
import {
	IonButton,
	IonItem,
	IonList,
	IonPage,
	IonText
} from "@ionic/react";
import { QRCodeSVG } from 'qrcode.react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./sendItemQR.css";

const SendItemQR: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();
	const params = useParams<{ index: string | undefined }>();

	const [loading, setLoading] = useState(true);

	useEffect(() => {

		const index = parseInt(params.index || '0')
		if (index >= 0 && index < stocksState.items.length) {
			setLoading(false);
		}
	}, [params, stocksState])

	const proceed = () => {



		if (stocksState.items[parseInt(params.index || "0")].destination && stocksState.items[parseInt(params.index || "0")].child_stock_number) {

			dispatch.stock.updateStock({
				index: parseInt(params.index || "0"), item: {
					status: 'cargo-underway1',
					weight_product: (stocksState.items[parseInt(params.index || "0")].weight_car_item || 0) - (stocksState.items[parseInt(params.index || "0")].weight_car || 0),
				}
			});
			history.push("/list");
		}
	}

	if (loading) return (<IonPage />)

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem lines="none"><IonText>Let the driver take a picture of this QR code or print this give it to him</IonText></IonItem>
				<IonItem lines="none"> <QRCodeSVG value={JSON.stringify(stocksState.items[parseInt(params.index || "0")])} /></IonItem>
				<IonItem lines="none" style={{ marginTop: '24px' }}>
					<IonButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
						Save
					</IonButton>
				</IonItem>
			</IonList>
		</IonPage>
	);
};

export default SendItemQR;
