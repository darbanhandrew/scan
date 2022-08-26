import { useState } from 'react';
import {
	IonButton,
	IonItem,
	IonLabel,
	IonList,
	IonNote,
	IonPage,
	IonSegment,
	IonSegmentButton,
	IonText
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./truck.css";
import "../Home.css";
import "../Login/login.css";

import StyledInput from '../../theme/components/Input';
import StyledButton from '../../theme/components/Button';

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
			history.push("/tabs");

		}
	}

	return (
		<IonPage className="truck">
			
				<div className="heading-container">
					<IonText color="primary" class="heading">Recieve Item</IonText>
					<IonText color="primary" class="subtitle">Fill the form and save</IonText>
				</div>
			<div className="form-container" style={{ flex: 5 }}>
				<div className="field-container">
					
					<div className="item-container">
						<StyledInput
							value={purchaseReceiptsState.draft.supplier}
							placeholder="Select Supplier"
							onIonChange={e => dispatch.purchaseReceipts.updateDraft({ supplier: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.supplierError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							value={purchaseReceiptsState.draft.INN}
							placeholder="INN"
							disabled
							onIonChange={e => dispatch.purchaseReceipts.updateDraft({ INN: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.INNError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							type="number"
							value={purchaseReceiptsState.draft.weight_car_item}
							placeholder="Weight"
							onIonChange={e => dispatch.purchaseReceipts.updateDraft({ weight_car_item: e.detail.value ? parseFloat(e.detail.value) : undefined })}
						/>
						<span slot="error">{errors.weightError || ''}</span>
					</div>
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
					<div className="single-item-container">
						<StyledButton style={{ width: '100%' }} onClick={() => proceed()}>Save</StyledButton>
					</div>
				</div>
				
			</div>
		</IonPage>
	);
};

export default Truck;
