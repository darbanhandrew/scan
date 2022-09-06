import { useEffect, useState } from 'react';
import {
	IonPage,
	IonText
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./sendItem.css";
import "../Home.css";
import "../Login/login.css";
import StyledInput from '../../theme/components/Input';
import StyledButton from '../../theme/components/Button';
import { useIntl } from 'react-intl';
import { StockEntry } from '../../types/StockEntry.type';

const SendItem: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();
	const intl = useIntl();


	useEffect(() => {
		dispatch.stock.removeDraft();
	}, []);

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

		if (stocksState.draft.empty_truck_weight === 0 || stocksState.draft.empty_truck_weight === undefined) {

			emptyTruckWeightError = "Empty truck field need to be filled!";
		}

		if (stocksState.draft.total_weight === 0 || stocksState.draft.total_weight === undefined) {

			truckItemWeightError = "Truck + Item weight field need to be filled!";
		}
		if (stocksState.draft.driver_name === "" || stocksState.draft.driver_name === undefined) {

			driverNameError = "Driver's name field need to be filled!";
		}
		if (stocksState.draft.driver_phone_number === "" || stocksState.draft.driver_phone_number === undefined) {

			driverPhoneError = "Driver's phone field need to be filled!";
		}

		const errs = {
			emptyTruckWeightError,
			truckItemWeightError,
			driverNameError,
			driverPhoneError
		};

		setError(errs);

		if (stocksState.draft.empty_truck_weight && stocksState.draft.total_weight && stocksState.draft.driver_name && stocksState.draft.driver_phone_number) {

			dispatch.stock.updateDraft({ total_weight_difference_with_truck_weight: stocksState.draft.total_weight - stocksState.draft.empty_truck_weight, })

			history.push(`/tabs/send-item-dest`);
		}
	}

	return (
		<IonPage className="truck">
			<div className="heading-container">
				<IonText color="primary" class="heading">
					{intl.formatMessage({ id: "Send Item", defaultMessage: "Send Item" })}
				</IonText>
				<IonText color="primary" class="subtitle">
					{intl.formatMessage({ id: "Fill the form and save", defaultMessage: "Fill the form and save" })}
				</IonText>
			</div>
			<div className="form-container" style={{ flex: 5, justifyContent: 'flex-start' }}>
				<div className="field-container">
					<div className="item-container">
						<StyledInput
							type="number"
							value={stocksState.draft.empty_truck_weight}
							placeholder={intl.formatMessage({ id: "Empty Truck Weight", defaultMessage: "Empty Truck Weight" })}
							onIonChange={e => dispatch.stock.updateDraft({ empty_truck_weight: e.detail.value ? parseFloat(e.detail.value) : undefined })}
						/>
						<span slot="error">{errors.emptyTruckWeightError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							type="number"
							value={stocksState.draft.total_weight}
							placeholder={intl.formatMessage({ id: "Truck + Item Weight", defaultMessage: "Truck + Item Weight" })}
							onIonChange={e => dispatch.stock.updateDraft({ total_weight: e.detail.value ? parseFloat(e.detail.value) : undefined })}
						/>
						<span slot="error">{errors.truckItemWeightError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							value={(stocksState.draft.total_weight || 0) - (stocksState.draft.empty_truck_weight || 0)}
							type="number"
							placeholder={intl.formatMessage({ id: "Item Weight", defaultMessage: "Item Weight" })}
							disabled
						/>
					</div>
					<div className="item-container">
						<IonText color="primary">
							{intl.formatMessage({ id: "Driver Info", defaultMessage: "Driver Info" })}
						</IonText>
					</div>
					<div className="item-container">
						<StyledInput
							value={stocksState.draft.driver_name}
							placeholder={intl.formatMessage({ id: "Name", defaultMessage: "Name" })}
							onIonChange={e => dispatch.stock.updateDraft({ driver_name: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.driverNameError || ''}</span>
					</div>
					<div className="item-container">

						<StyledInput
							value={stocksState.draft.driver_phone_number}
							placeholder={intl.formatMessage({ id: "Phone", defaultMessage: "Phone" })}
							onIonChange={e => dispatch.stock.updateDraft({ driver_phone_number: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.driverPhoneError || ''}</span>
					</div>
					<div className="item-container">
						<StyledButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
							{intl.formatMessage({ id: "Next", defaultMessage: "Next" })}
						</StyledButton>
					</div>
				</div>
			</div>
		</IonPage>
	);
};

export default SendItem;
