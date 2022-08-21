import { useEffect, useState } from 'react';
import {
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonNote,
	IonPage,
	IonSegment,
	IonSegmentButton
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./sendItemDest.css";

const SendItemDest: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();
	const params = useParams<{ index: string | undefined }>();

	const [loading, setLoading] = useState(true);

	const [errors, setError] = useState<{
		destFactorError: string | undefined;
		stockNoError: string | undefined;
	}>({
		destFactorError: undefined,
		stockNoError: undefined,
	})

	useEffect(() => {

		const index = parseInt(params.index || '0')
		if (index >= 0 && index < stocksState.items.length) {
			setLoading(false);
		}
	}, [params, stocksState])

	const proceed = () => {

		let destFactorError: string | undefined = undefined;
		let stockNoError: string | undefined = undefined;

		if (stocksState.items[parseInt(params.index || "0")].destination === "" || stocksState.items[parseInt(params.index || "0")].destination === undefined) {

			destFactorError = "Destination factory field need to be filled!";
		}

		if (stocksState.items[parseInt(params.index || "0")].child_stock_number === "" || stocksState.items[parseInt(params.index || "0")].child_stock_number === undefined) {

			stockNoError = "Child stock number field need to be filled!";
		}
		const errs = {
			destFactorError,
			stockNoError,
		};

		setError(errs);

		if (stocksState.items[parseInt(params.index || "0")].destination && stocksState.items[parseInt(params.index || "0")].child_stock_number) {

			dispatch.stock.updateStock({
				index: parseInt(params.index || "0"), item: {
					status: 'cargo-underway1',
					weight_product: (stocksState.items[parseInt(params.index || "0")].weight_car_item || 0) - (stocksState.items[parseInt(params.index || "0")].weight_car || 0),
				}
			});
			history.push(`/tabs/send-item-qr/${parseInt(params.index || "0")}`);

		}
	}

	if (loading) return (<IonPage />)

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem className={errors.destFactorError ? 'ion-invalid' : ''}>
					<IonLabel>Destination factory:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].destination}
						placeholder="Destination factory"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { destination: e.detail.value ? e.detail.value : undefined } })}
					/>
					<span slot="error">{errors.destFactorError || ''}</span>
				</IonItem>
				<IonItem className={errors.stockNoError ? 'ion-invalid' : ''}>
					<IonLabel>Child stock number:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].child_stock_number}
						placeholder="Child stock number"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { child_stock_number: e.detail.value ? e.detail.value : undefined } })}
					/>
					<span slot="error">{errors.stockNoError || ''}</span>
				</IonItem>
				<IonItem>
					<IonLabel>Item name:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].item}
						placeholder="Item name"
						disabled
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Harvest method:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].harvestMethod}
						placeholder="Harvest method"
						disabled
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Complemen.info:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].complement_info1}
						placeholder="Complemen.info"
						disabled
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Complemen.info2:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].complement_info2}
						placeholder="Complemen.info2"
						disabled
					/>
				</IonItem>
				<IonItem lines="none" style={{ marginTop: '24px' }}>
					<IonButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
						Confirm
					</IonButton>
				</IonItem>
			</IonList>
		</IonPage>
	);
};

export default SendItemDest;
