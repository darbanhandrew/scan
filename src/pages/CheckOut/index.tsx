import { useEffect, useState } from 'react';
import {
	IonPage,
	IonText
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./checkout.css";
import "../Home.css";
import "../Login/login.css";
import { PurchaseReceipt } from '../../types/PurchaseReceipt.type';
import { FrappeRequestManager } from '../../util/FrappeNode';
import StyledButton from '../../theme/components/Button';
import StyledInput from '../../theme/components/Input';
import { useIntl } from 'react-intl';

const CheckOut: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const history = useHistory();
	const params = useParams<{ docname: string | undefined }>();
	const intl = useIntl();

	const [loading, setLoading] = useState(true);
	const [receipt, setReceipt] = useState<PurchaseReceipt>();

	const [errors, setError] = useState<{
		carWeightError: string | undefined;
	}>({
		carWeightError: undefined,
	})

	useEffect(() => {

		if (params.docname) {
			loadDoc(params.docname)
		} else {
			setLoading(false);
		}

	}, [params])

	const loadDoc = async (docname: string) => {
		try {
			const resp = await FrappeRequestManager.getDocument('Purchase Receipt', docname, ["*"]);
			setReceipt(resp.data.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const proceed = async () => {

		let carWeightError: string | undefined = undefined;

		if (receipt === undefined) {

			return;
		}


		if (receipt.empty_truck_weight === 0 || receipt.empty_truck_weight === undefined) {

			carWeightError = "Empty Truck Weight need to be filled!";
		}

		const errs = {
			carWeightError,
		};

		setError(errs);

		if (receipt.empty_truck_weight && receipt.name) {

			const submitForm: PurchaseReceipt = {
				empty_truck_weight: receipt.empty_truck_weight,
				total_weight_difference_with_truck_weight: (receipt.total_weight || 0) - (receipt.empty_truck_weight || 0),
				step: 'Check-out'
			};

			try {

				const resp = await dispatch.purchaseReceipts.editPR({ name: receipt.name, pr: submitForm });
				console.log(resp);
				history.push("/tabs");
			} catch (err) {

				console.error(err);
			}
		}
	}

	if (loading || receipt === undefined) return (<IonPage />)

	return (
		<IonPage className="truck">
			<div className="heading-container">
				<IonText color="primary" class="heading">
					{intl.formatMessage({ id: "Receive Item", defaultMessage: "Receive Item" })}
				</IonText>
				<IonText color="primary" class="subtitle">
					{intl.formatMessage({ id: "Fill the form and save", defaultMessage: "Fill the form and save" })}
				</IonText>
			</div>
			<div className="form-container" style={{ flex: 5, justifyContent: 'flex-start' }}>
				<div className="field-container">
					<div className="item-container">
						<StyledInput
							value={receipt.supplier}
							placeholder={intl.formatMessage({ id: "Select Supplier", defaultMessage: "Select Supplier" })}
							disabled
						/>
					</div>
					<div className="item-container">
						<StyledInput
							value={receipt.items && receipt.items.length > 0 ? receipt.items[0].item_name : 'Error'}
							placeholder={intl.formatMessage({ id: "Select Item", defaultMessage: "Select Item" })}
							disabled
						/>
					</div>
					<div className="item-container">
						<StyledInput
							value={receipt.empty_truck_weight}
							type="number"
							placeholder={intl.formatMessage({ id: "Weight(Empty truck)", defaultMessage: "Weight(Empty truck)" })}
							onIonChange={e => setReceipt({ ...receipt, empty_truck_weight: e.detail.value ? parseInt(e.detail.value) : undefined })}
						/>
						<span slot="error">{errors.carWeightError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							value={(receipt.total_weight || 0) - (receipt?.empty_truck_weight || 0)}
							type="number"
							placeholder={intl.formatMessage({ id: "Weight(Product) Autofill", defaultMessage: "Weight(Product) Autofill" })}
							disabled
						/>
					</div>
					<div className="single-item-container">
						<StyledButton style={{ width: '100%' }} onClick={() => proceed()}>
							{intl.formatMessage({ id: "Confirm", defaultMessage: "Confirm" })}
						</StyledButton>
					</div>
				</div>

			</div>
		</IonPage>
	);
};

export default CheckOut;
