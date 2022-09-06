import { useEffect, useState } from 'react';
import {
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonText
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./directDriver.css";
import { useIntl } from 'react-intl';
import { StockEntry } from '../../types/StockEntry.type';
import "../Home.css";
import "../Login/login.css";
import StyledButton from '../../theme/components/Button';
import StyledInput from '../../theme/components/Input';

const DirectDriver: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const history = useHistory();
	const intl = useIntl();

	const [errors, setError] = useState<{
		// supplierError: string | undefined;
		// itemError: string | undefined;
		weightError: string | undefined;
	}>({
		// supplierError: undefined,
		// itemError: undefined,
		weightError: undefined,
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
			//	TODO: Show error
			return;
		}

		// let supplierError: string | undefined = undefined;
		// let itemError: string | undefined = undefined;
		let weightError: string | undefined = undefined;

		// if (stockEntry.supplier === "" || stockEntry.supplier === undefined) {

		// 	supplierError = "Supplier field need to be filled!";
		// }

		// if (stockEntry.item === "" || stockEntry.item === undefined) {

		// 	itemError = "Item field need to be filled!";
		// }
		if (stockEntry.empty_truck_weight === 0 || stockEntry.empty_truck_weight === undefined) {

			weightError = "Weight (empty truck) field need to be filled!";
		}

		const errs = {
			// supplierError,
			// itemError,
			weightError,
		};

		setError(errs);

		if (stockEntry.name && stockEntry.empty_truck_weight) {

			try {
				const resp = await dispatch.stock.editSE({ name: stockEntry.name, se: { ...stockEntry, total_weight_difference_with_truck_weight: (stockEntry.total_weight || 0) - (stockEntry.empty_truck_weight || 0) } });
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

							value={stockEntry.supplier}
							placeholder={intl.formatMessage({ id: "Select Supplier", defaultMessage: "Select Supplier" })}
							disabled
						/>
						{/* <span slot="error">{errors.supplierError || ''}</span> */}
					</div>
					<div className="item-container">
						<StyledInput

							value={stockEntry.items && stockEntry.items.length > 0 ? stockEntry.items[0].item_name : undefined}
							placeholder={intl.formatMessage({ id: "Item", defaultMessage: "Item" })}
							disabled
						/>
						{/* <span slot="error">{errors.itemError || ''}</span> */}
					</div>

					<div className="item-container">
						<StyledInput

							type="number"
							value={stockEntry.empty_truck_weight}
							placeholder={intl.formatMessage({ id: "Weight (empty truck)", defaultMessage: "Weight (empty truck)" })}
							onIonChange={e => setStockEntry({ ...stockEntry, empty_truck_weight: parseInt(e.detail.value || "0") })}
						/>
						<span slot="error">{errors.weightError || ''}</span>
					</div>
					<div className="item-container">

						<StyledInput
							value={(stockEntry.total_weight || 0) - (stockEntry.empty_truck_weight || 0)}
							placeholder={intl.formatMessage({ id: "Weight (product)", defaultMessage: "Weight (product)" })}
							disabled
						/>
					</div>
					<div className="item-container">
						<StyledButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
							{intl.formatMessage({ id: "Confirm", defaultMessage: "Confirm" })}
						</StyledButton>
					</div>
				</div>
			</div>


		</IonPage>
	);
};

export default DirectDriver;
