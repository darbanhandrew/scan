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
	IonSegmentButton,
	IonText
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./scanResult.css";
import Truck from '../Truck';
import "../Home.css";
import "../Login/login.css";
import { useIntl } from 'react-intl';
import { StockEntry } from '../../types/StockEntry.type';
import StyledButton from '../../theme/components/Button';
import StyledInput from '../../theme/components/Input';

const ScanResult: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();
	const intl = useIntl();

	const [errors, setError] = useState<{
		// destFactorError: string | undefined;
		// truckItemWeightError: string | undefined;
		// licensePlateError: string | undefined;
		stockError: string | undefined;
	}>({
		// destFactorError: undefined,
		// truckItemWeightError: undefined,
		// licensePlateError: undefined,
		stockError: undefined,
	})

	const params = useParams<{ docname: string | undefined }>();

	const [loading, setLoading] = useState(true);
	const [stockEntry, setStockEntry] = useState<StockEntry>();


	useEffect(() => {

		if (params.docname) {
			loadDoc(params.docname);
		} else {

			setLoading(false);
		}

	}, [params])

	const loadDoc = async (docname: string) => {
		try {
			const resp = await dispatch.stock.getSE({ name: docname, fields: ['*'] });
			setStockEntry(resp.data.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const proceed = async () => {

		if (stockEntry === undefined) {
			return;
		}

		// let destFactorError: string | undefined = undefined;
		// let truckItemWeightError: string | undefined = undefined;
		// let licensePlateError: string | undefined = undefined;
		let stockError: string | undefined = undefined;

		// if (stockEntry.to_warehouse === "" || stockEntry.to_warehouse === undefined) {

		// 	destFactorError = "Destination factory field need to be filled!";
		// }

		// if (stockEntry.total_weight === 0 || stockEntry.total_weight === undefined) {

		// 	truckItemWeightError = "Truck + item weight field need to be filled!";
		// }
		// if (stockEntry.licensePlate === "" || stockEntry.licensePlate === undefined) {

		// 	licensePlateError = "Plate Number field need to be filled!";
		// }

		if (stockEntry.target_warehouse_address === "" || stockEntry.target_warehouse_address === undefined) {

			stockError = "Stock field need to be filled!";
		}

		const errs = {
			// destFactorError,
			// truckItemWeightError,
			// licensePlateError,
			stockError
		};

		setError(errs);

		if (stockEntry.target_warehouse_address && stockEntry.name) {

			try {
				const resp = await dispatch.stock.editSE({ name: stockEntry.name, se: stockEntry });
				history.push("/tabs/list");
			} catch (err) {
				console.log(err);
			}
		}
	}

	if (loading || stockEntry === undefined) return (<IonPage />);

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

							value={stockEntry.to_warehouse}
							placeholder={intl.formatMessage({ id: "Select Destination factory", defaultMessage: "Select Destination factory" })}
							disabled
						/>
						{/* <span slot="error">{errors.destFactorError || ''}</span> */}
					</div>
					<div className="item-container">
						<StyledInput

							value={stockEntry.total_weight}
							placeholder={intl.formatMessage({ id: "Truck + item weight", defaultMessage: "Truck + item weight" })}
							disabled
						/>
						{/* <span slot="error">{errors.truckItemWeightError || ''}</span> */}
					</div>

					<div className="item-container">
						<StyledInput

							value={stockEntry.vehicle_number}
							placeholder={intl.formatMessage({ id: "Plate Number", defaultMessage: "Plate Number" })}
							disabled
						/>
						{/* <span slot="error">{errors.licensePlateError || ''}</span> */}
					</div>
					<div className="item-container">

						<StyledInput

							value={stockEntry.target_warehouse_address}
							placeholder={intl.formatMessage({ id: "Choose Stock", defaultMessage: "Choose Stock" })}
							onIonChange={e => setStockEntry({ ...stockEntry, target_warehouse_address: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.stockError || ''}</span>
					</div>
					<div className="item-container">
						<StyledButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
							{intl.formatMessage({ id: "Save", defaultMessage: "Save" })}
						</StyledButton>
					</div>
				</div>
			</div>
		</IonPage>
	);
};

export default ScanResult;
