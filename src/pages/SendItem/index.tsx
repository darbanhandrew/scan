import { useState } from 'react';
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
import { useHistory } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./sendItem.css";

const SendItem: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();
	const [errors, setError] = useState<{
		emptyTruckWeightError: string | undefined;
		truckItemWeightError: string | undefined;
		driverNameError: string | undefined;
		driverPhoneError: string | undefined;
	}>({
		emptyTruckWeightError: undefined,
		truckItemWeightError: undefined,
		driverNameError: undefined,
		driverPhoneError: undefined,
	})

	const proceed = () => {
		
		let emptyTruckWeightError: string | undefined = undefined;
		let truckItemWeightError: string | undefined = undefined;
		
		let driverNameError: string | undefined = undefined;
		let driverPhoneError: string | undefined = undefined;

		if (stocksState.draft.weight_car === 0 || stocksState.draft.weight_car === undefined) {

			emptyTruckWeightError = "Empty truck field need to be filled!";
		}

		if (stocksState.draft.weight_car_item === 0 || stocksState.draft.weight_car_item === undefined) {

			truckItemWeightError = "Truck + Item weight field need to be filled!";
		}
		if (stocksState.draft.driver_name === "" || stocksState.draft.driver_name === undefined) {

			driverNameError = "Driver's name field need to be filled!";
		}
		if (stocksState.draft.driver_phone === "" || stocksState.draft.driver_phone === undefined) {

			driverPhoneError = "Driver's phone field need to be filled!";
		}

		const errs = {
			emptyTruckWeightError,
			truckItemWeightError,
			driverNameError,
			driverPhoneError
		};

		setError(errs);

		if (stocksState.draft.weight_car && stocksState.draft.weight_car_item && stocksState.draft.driver_name && stocksState.draft.driver_phone) {

			dispatch.stock.updateDraft({
				date: new Date().toISOString(),
				status: 'initiated',
				weight_product: (stocksState.draft.weight_car_item || 0) - (stocksState.draft.weight_car || 0),

			});
			dispatch.stock.saveDraft();
			history.push("/home");
			
		}
	}

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem className={errors.emptyTruckWeightError ? 'ion-invalid' : ''}>
					<IonLabel>Empty Truck Weight:</IonLabel>
					<IonInput
						type="number"
						value={stocksState.draft.weight_car}
						placeholder="Empty Truck Weight"
						onIonChange={e => dispatch.stock.updateDraft({ weight_car: e.detail.value ? parseFloat(e.detail.value) : undefined })}
					/>
					<span slot="error">{errors.emptyTruckWeightError || ''}</span>
				</IonItem>
				<IonItem className={errors.truckItemWeightError ? 'ion-invalid' : ''}>
					<IonLabel>Truck + Item Weight:</IonLabel>
					<IonInput
						type="number"
						value={stocksState.draft.weight_car_item}
						placeholder="Truck + Item Weight"
						onIonChange={e => dispatch.stock.updateDraft({ weight_car_item: e.detail.value ? parseFloat(e.detail.value) : undefined })}
					/>
					<span slot="error">{errors.truckItemWeightError || ''}</span>
				</IonItem>
				<IonItem>
					<IonLabel>Item Weight:</IonLabel>
					<IonInput
						value={(stocksState.draft.weight_car_item || 0) - (stocksState.draft.weight_car || 0)}
						type="number"
						placeholder="Autofill"
						disabled
					/>
				</IonItem>
				<IonItem className={errors.driverNameError ? 'ion-invalid' : ''}>
					<IonLabel>{"Driver's name:"}</IonLabel>
					<IonInput
						value={stocksState.draft.driver_name}
						placeholder="Driver's name"
						onIonChange={e => dispatch.stock.updateDraft({ driver_name: e.detail.value ? e.detail.value : undefined })}
					/>
					<span slot="error">{errors.driverNameError || ''}</span>
				</IonItem>
				<IonItem className={errors.driverPhoneError ? 'ion-invalid' : ''}>
					<IonLabel>{"Driver's phone:"}</IonLabel>
					<IonInput
						value={stocksState.draft.driver_phone}
						placeholder="Driver's phone:"
						onIonChange={e => dispatch.stock.updateDraft({ driver_phone: e.detail.value ? e.detail.value : undefined })}
					/>
					<span slot="error">{errors.driverPhoneError || ''}</span>
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

export default SendItem;
