import { useEffect, useState } from 'react';
import {
	IonButton,
	IonInput,
	IonItem,
	IonList,
	IonPage,
	IonText} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./sendItemDest.css";
import "../Home.css";
import "../Login/login.css";
import { useIntl } from 'react-intl';
import { StockEntry } from '../../types/StockEntry.type';
import StyledButton from '../../theme/components/Button';
import StyledInput from '../../theme/components/Input';

const SendItemDest: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();
	const params = useParams<{ docname: string | undefined }>();
	const intl = useIntl();
	const [stockEntry, setStockEntry] = useState<StockEntry>();

	const [loading, setLoading] = useState(true);

	const [errors, setError] = useState<{
		destFactorError: string | undefined;
		stockNoError: string | undefined;
	}>({
		destFactorError: undefined,
		stockNoError: undefined,
	})

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

		let destFactorError: string | undefined = undefined;
		let stockNoError: string | undefined = undefined;

		if (stockEntry.to_warehouse === "" || stockEntry.to_warehouse === undefined) {

			destFactorError = "Destination factory field need to be filled!";
		}

		if (stockEntry.bonnet === "" || stockEntry.bonnet === undefined) {

			stockNoError = "Child stock number field need to be filled!";
		}
		const errs = {
			destFactorError,
			stockNoError,
		};

		setError(errs);

		if (stockEntry.to_warehouse && stockEntry.bonnet && stockEntry.name) {

			try {
				const resp = await dispatch.stock.editSE({ name: stockEntry.name, se: stockEntry });
				history.push(`/tabs/send-item-qr/${stockEntry.name}`);
			} catch (err) {
				console.log(err);
			}
		}
	}

	if (loading || stockEntry === undefined) return (<IonPage />)

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
							placeholder={intl.formatMessage({ id: "Destination factory", defaultMessage: "Destination factory" })}
							onIonChange={e => setStockEntry({ ...stockEntry, to_warehouse: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.destFactorError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							
							value={stockEntry.bonnet}
							placeholder={intl.formatMessage({ id: "Child stock number", defaultMessage: "Child stock number" })}
							onIonChange={e => setStockEntry({ ...stockEntry, bonnet: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.stockNoError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							
							value={stockEntry.items && stockEntry.items.length > 0 ? stockEntry.items[0].item_name : ''}
							placeholder={intl.formatMessage({ id: "Item name", defaultMessage: "Item name" })}
							disabled
						/>
					</div>
					<div className="item-container">
						<StyledInput
							
							value={stockEntry.harvest_method}
							placeholder={intl.formatMessage({ id: "Harvest method", defaultMessage: "Harvest method" })}
							disabled
						/>
					</div>
					
					<div className="item-container">
						<StyledInput
							
							value={stockEntry.complementary_info1}
							placeholder={intl.formatMessage({ id: "Complemen.info", defaultMessage: "Complemen.info" })}
							disabled
						/>
					</div>
					<div className="item-container">

						<StyledInput
							
							value={stockEntry.complementary_info2}
							placeholder={intl.formatMessage({ id: "Complemen.info", defaultMessage: "Complemen.info" }) + '2'}
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

export default SendItemDest;
