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
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./scanResult.css";
import Truck from '../Truck';

const ScanResult: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();

	const [errors, setError] = useState<{
		destFactorError: string | undefined;
		truckItemWeightError: string | undefined;
		licensePlateError: string | undefined;
		stockError: string | undefined;
	}>({
		destFactorError: undefined,
		truckItemWeightError: undefined,
		licensePlateError: undefined,
		stockError: undefined,
	})

	const params = useParams<{ index: string | undefined }>();

	const [loading, setLoading] = useState(true);


	useEffect(() => {

		const index = parseInt(params.index || '0')
		if (index >= 0 && index < stocksState.items.length) {
			setLoading(false);
		}
	}, [params, stocksState]);

	const proceed = () => {
		
		let destFactorError: string | undefined = undefined;
		let truckItemWeightError: string | undefined = undefined;
		let licensePlateError: string | undefined = undefined;
		let stockError: string | undefined = undefined;

		if (stocksState.items[parseInt(params.index || "0")].destination === "" || stocksState.items[parseInt(params.index || "0")].destination === undefined) {

			destFactorError = "Destination factory field need to be filled!";
		}

		if (stocksState.items[parseInt(params.index || "0")].weight_car_item === 0 || stocksState.items[parseInt(params.index || "0")].weight_car_item=== undefined) {

			truckItemWeightError = "Truck + item weight field need to be filled!";
		}
		if (stocksState.items[parseInt(params.index || "0")].licensePlate === "" || stocksState.items[parseInt(params.index || "0")].licensePlate === undefined) {

			licensePlateError = "Plate Number field need to be filled!";
		}

		if (stocksState.items[parseInt(params.index || "0")].stock === "" || stocksState.items[parseInt(params.index || "0")].stock === undefined) {

			stockError = "Stock field need to be filled!";
		}

		const errs = {
			destFactorError,
			truckItemWeightError,
			licensePlateError,
			stockError
		};

		setError(errs);

		if (stocksState.items[parseInt(params.index || "0")].destination && stocksState.items[parseInt(params.index || "0")].weight_car_item && stocksState.items[parseInt(params.index || "0")].licensePlate && stocksState.items[parseInt(params.index || "0")].stock) {

			dispatch.stock.updateStock({
				index: parseInt(params.index || "0"), item: {
				status: 'cargo-underway2'
			}});
			history.push("/tabs");
			
		}
	}

	if (loading) return (<IonPage />);

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem className={errors.destFactorError ? 'ion-invalid' : ''}>
					<IonLabel>Destination factory:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].destination}
						placeholder="Select Destination factory"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { destination: e.detail.value ? e.detail.value : undefined }})}
					/>
					<span slot="error">{errors.destFactorError || ''}</span>
				</IonItem>
				<IonItem className={errors.truckItemWeightError ? 'ion-invalid' : ''}>
					<IonLabel>Truck + item weight:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].weight_car_item}
						placeholder="Truck + item weight"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { weight_car_item: e.detail.value ? parseFloat(e.detail.value) : undefined }})}
					/>
					<span slot="error">{errors.truckItemWeightError || ''}</span>
				</IonItem>
				<IonItem className={errors.licensePlateError ? 'ion-invalid' : ''}>
					<IonLabel>Plate Number:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].licensePlate}
						placeholder="Plate Number"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { licensePlate: e.detail.value ? e.detail.value : undefined }})}
					/>
					<span slot="error">{errors.licensePlateError || ''}</span>
				</IonItem>
				<IonItem className={errors.stockError ? 'ion-invalid' : ''}>
					<IonLabel>Choose Stock:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].stock}
						placeholder="Stock"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { stock: e.detail.value ? e.detail.value : undefined } })}
					/>
					<span slot="error">{errors.stockError || ''}</span>
				</IonItem>
				<IonItem lines="none" style={{ marginTop: '24px'}}>
					<IonButton style={{ width: '100%', height: '38px'}} onClick={() => proceed()}>
						Save
					</IonButton>
				</IonItem>
			</IonList>
		</IonPage>
	);
};

export default ScanResult;
