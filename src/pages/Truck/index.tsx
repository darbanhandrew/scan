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
import "./truck.css";

const Truck: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const purchaseReceiptsState = useSelector((state: RootState) => state.purchaseReceipts);
	const history = useHistory();
	const [errors, setError] = useState<{
		supplierError: string | undefined;
		INNError: string | undefined;
		weightError: string | undefined;
		harvestError: string | undefined;
	}>({
		supplierError: undefined,
		INNError: undefined,
		weightError: undefined,
		harvestError: undefined,
	})

	const proceed = () => {
		
		let supplierError: string | undefined = undefined;
		let INNError: string | undefined = undefined;
		let weightError: string | undefined = undefined;
		let harvestError: string | undefined = undefined;

		if (purchaseReceiptsState.draft.supplier === "" || purchaseReceiptsState.draft.supplier === undefined) {

			supplierError = "Supplier field need to be filled!";
		}

		if (purchaseReceiptsState.draft.INN === "" || purchaseReceiptsState.draft.INN === undefined) {

			INNError = "INN field need to be filled!";
		}
		if (purchaseReceiptsState.draft.weight_car_item === 0 || purchaseReceiptsState.draft.weight_car_item === undefined) {

			weightError = "Weight field need to be filled!";
		}

		if (purchaseReceiptsState.draft.harvestMethod === "" || purchaseReceiptsState.draft.harvestMethod === undefined) {

			harvestError = "Harvest Method field need to be filled!";
		}

		const errs = {
			supplierError,
			INNError,
			weightError,
			harvestError
		};

		setError(errs);

		if (purchaseReceiptsState.draft.supplier && purchaseReceiptsState.draft.weight_car_item && purchaseReceiptsState.draft.harvestMethod) {

			dispatch.purchaseReceipts.updateDraft({
				date: new Date().toISOString(),
				status: 'received'
			});
			dispatch.purchaseReceipts.saveDraft();
			history.push("/home");
			
		}
	}

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem className={errors.supplierError ? 'ion-invalid' : ''}>
					<IonLabel>Supplier:</IonLabel>
					<IonInput
						value={purchaseReceiptsState.draft.supplier}
						placeholder="Select Supplier"
						onIonChange={e => dispatch.purchaseReceipts.updateDraft({ supplier: e.detail.value ? e.detail.value : undefined })}
					/>
					<span slot="error">{errors.supplierError || ''}</span>
				</IonItem>
				<IonItem className={errors.INNError ? 'ion-invalid' : ''}>
					<IonLabel>INN:</IonLabel>
					<IonInput
						value={purchaseReceiptsState.draft.INN}
						placeholder="Autofill"
						onIonChange={e => dispatch.purchaseReceipts.updateDraft({ INN: e.detail.value ? e.detail.value : undefined })}
					/>
					<span slot="error">{errors.INNError || ''}</span>
				</IonItem>
				<IonItem className={errors.weightError ? 'ion-invalid' : ''}>
					<IonLabel>Weight (car + item):</IonLabel>
					<IonInput
						type="number"
						value={purchaseReceiptsState.draft.weight_car_item}
						placeholder="Weight"
						onIonChange={e => dispatch.purchaseReceipts.updateDraft({ weight_car_item: e.detail.value ? parseFloat(e.detail.value) : undefined })}
					/>
					<span slot="error">{errors.weightError || ''}</span>
				</IonItem>
				<IonItem className={errors.harvestError ? 'ion-invalid' : ''}>
					<IonLabel>Harvest method:</IonLabel>
					<IonSegment
						onIonChange={e => dispatch.purchaseReceipts.updateDraft({ harvestMethod: e.detail.value ? e.detail.value : undefined })}
						value={purchaseReceiptsState.draft.harvestMethod}
						style={{ width: "50%" }}
					>
						<IonSegmentButton value="hand">
							<IonLabel>Hand</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton value="machine">
							<IonLabel>Machine</IonLabel>
						</IonSegmentButton>
					</IonSegment>
					<span slot="error">{errors.harvestError || ''}</span>
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

export default Truck;
