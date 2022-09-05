import { useEffect, useState } from 'react';
import {
	IonPage,
	IonText
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch } from "../../store";
import "./receipt.css";
import "../Home.css";
import "../Login/login.css";
import { FrappeRequestManager } from '../../util/FrappeNode';
import { PurchaseReceipt } from '../../types/PurchaseReceipt.type';
import StyledButton from '../../theme/components/Button';
import StyledInput from '../../theme/components/Input';
import { useIntl } from 'react-intl';

const Receipt: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();

	const history = useHistory();
	const params = useParams<{ docname: string | undefined }>();

	const intl = useIntl();

	const [receipt, setReceipt] = useState<PurchaseReceipt>();
	const [stock, setChooseStock] = useState<string>();
	const [loading, setLoading] = useState(true);
	const [errors, setError] = useState<{

		stockError: string | undefined;
	}>({

		stockError: undefined,
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

		let stockError: string | undefined = undefined;

		if (stock === "" || stock === undefined) {

			stockError = "Stock field need to be filled!";
		}

		const errs = {
			stockError,
		};

		setError(errs);

		if (stock && receipt?.name) {

			const submitForm: PurchaseReceipt = {
				bonnet: stock,
				step: 'Unloading'
			};

			try {

				const resp = await dispatch.purchaseReceipts.editPR({ name: receipt?.name, pr: submitForm });
				console.log(resp);
				history.push("/tabs");
			} catch (err) {

				console.error(err);
			}
		}
	}

	if (loading) return (<IonPage />)

	return (
		<IonPage className="truck">
			<div className="heading-container">
				<IonText color="primary" class="heading">
					{intl.formatMessage({ id: "Title", defaultMessage: "Title" })}
				</IonText>
				<IonText color="primary" class="subtitle">
					{intl.formatMessage({ id: "Choose stock and direct the driver", defaultMessage: "Choose stock and direct the driver" })}
				</IonText>
			</div>
			<div className="form-container" style={{ flex: 5, justifyContent: 'flex-start' }}>
				<div className="field-container">
					<div className="item-container">
						<StyledInput
							value={receipt?.supplier}
							placeholder={intl.formatMessage({ id: "Supplier", defaultMessage: "Supplier" })}
							disabled
						/>
					</div>
					<div className="item-container">
						<StyledInput
							value={receipt && receipt.items && receipt?.items?.length > 0 ? receipt?.items[0].item_name : 'Unknown'}
							placeholder={intl.formatMessage({ id: "Item", defaultMessage: "Item" })}
							disabled
						/>
					</div>

					<div className="item-container">
						<StyledInput
							value={stock}
							placeholder={intl.formatMessage({ id: "Choose Stock", defaultMessage: "Choose Stock" })}
							onIonChange={(e) => setChooseStock(e.detail.value || undefined)}
						/>
						<span slot="error">{errors.stockError || ''}</span>
					</div>
					<div className="single-item-container">
						<StyledButton style={{ width: '100%' }} onClick={() => proceed()}>
							{intl.formatMessage({ id: "Save", defaultMessage: "Save" })}
						</StyledButton>
					</div>
				</div>

			</div>
		</IonPage>
	);
};

export default Receipt;
