import { useEffect, useState } from 'react';
import {
	IonPage,
	IonText
} from "@ionic/react";
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
import StyledAutocomplete from '../../theme/components/Autocomplete';
import { FrappeRequestManager } from '../../util/FrappeNode';
import { GroupBase, OptionsOrGroups } from 'react-select';

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
		itemNameError: string | undefined;
	}>({
		destFactorError: undefined,
		stockNoError: undefined,
		itemNameError: undefined,
	})

	// useEffect(() => {

	// 	if (params.docname) {
	// 		loadDoc(params.docname);
	// 	} else {

	// 		setLoading(false);
	// 	}

	// }, [params])

	// const loadDoc = async (docname: string) => {
	// 	try {
	// 		const resp = await dispatch.stock.getSE({ name: docname, fields: ['*'] });
	// 		setStockEntry(resp.data.data);
	// 		setLoading(false);
	// 	} catch (err) {
	// 		console.log(err);
	// 		setLoading(false);
	// 	}
	// };

	const loadItems = async (search: string, loadedOptions: OptionsOrGroups<unknown, GroupBase<unknown>>) => {

		try {

			const resp = await FrappeRequestManager.listDocuments('Item', ['*'], [['Item', 'name', 'like', `%${search}%`]], loadedOptions.length, 50);
			// setSuppliers(resp.data.data);
			console.log(resp.data);

			const options = {
				options: resp.data.data.map((item: Record<string, any>) => ({ value: item.item_code, label: item.item_name })),
				hasMore: resp.data.data.length === 0,
			};

			console.log(options);

			return options;
		} catch (error) {
			console.error(error);
			return {
				options: [],
				hasMore: false,
			}

		}
	};

	const proceed = async () => {


		let destFactorError: string | undefined = undefined;
		let stockNoError: string | undefined = undefined;
		let itemNameError: string | undefined = undefined;

		if (stocksState.draft.to_warehouse === "" || stocksState.draft.to_warehouse === undefined) {

			destFactorError = "Destination factory field need to be filled!";
		}

		if (stocksState.draft.bonnet === "" || stocksState.draft.bonnet === undefined) {

			stockNoError = "Child stock number field need to be filled!";
		}

		if (stocksState.draft.items === undefined || stocksState.draft.items.length === 0) {
			itemNameError = "Item name field need to be filled!";
		}

		const errs = {
			destFactorError,
			stockNoError,
			itemNameError,
		};

		setError(errs);

		if (stocksState.draft.to_warehouse && stocksState.draft.bonnet && stocksState.draft.items) {

			const submitSE = {
				...stocksState.draft,
				naming_series: "MAT-STE-.YYYY.-",
				purpose: "Manufacture",
				stock_entry_type: "Manufacture",
			}

			try {
				const resp = await dispatch.stock.submitSE(submitSE);
				if (resp.data.data && resp.data.data.name) {

					history.push(`/tabs/send-item-qr/${resp.data.data.name}`);
				}
			} catch (err) {
				console.log(err);
			}
		}
	}

	// if (loading || stockEntry === undefined) return (<IonPage />)

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

							value={stocksState.draft.to_warehouse}
							placeholder={intl.formatMessage({ id: "Destination factory", defaultMessage: "Destination factory" })}
							// onIonChange={e => setStockEntry({ ...stockEntry, to_warehouse: e.detail.value ? e.detail.value : undefined })}
							onIonChange={e => dispatch.stock.updateDraft({ ...stocksState.draft, to_warehouse: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.destFactorError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput

							value={stocksState.draft.bonnet}
							placeholder={intl.formatMessage({ id: "Child stock number", defaultMessage: "Child stock number" })}
							// onIonChange={e => setStockEntry({ ...stockEntry, bonnet: e.detail.value ? e.detail.value : undefined })}
							onIonChange={e => dispatch.stock.updateDraft({ ...stocksState.draft, bonnet: e.detail.value ? e.detail.value : undefined })}
						/>
						<span slot="error">{errors.stockNoError || ''}</span>
					</div>
					<div className="item-container">

						<StyledAutocomplete
							// <{ name: string }>
							// styles={customStyles}
							placeholder={intl.formatMessage({ id: "Select Item", defaultMessage: "Select Item" })}
							value={(stocksState.draft?.items?.length || 0) > 0 ? { value: stocksState.draft?.items![0], label: stocksState.draft?.items![0].item_name } : undefined}
							loadOptions={(inputValue, loadedOptions) => loadItems(inputValue, loadedOptions)}
							onChange={(newValue, actionMeta) => {
								console.log(newValue);
								dispatch.stock.updateDraft({
									items: newValue ? [{
										item_code: (newValue as { label: string; value: string; }).value, is_finished_item: 1,
										s_warehouse: "Готовые продукты - RAC",
										actual_qty: 0,
										basic_rate: 5,
										basic_amount: 25,
										t_warehouse: "Товары в пути - RAC",

										qty: 5,
										transfer_qty: 5
									}] : undefined
								})
							}}
						// onInputChange={(newValue, actionMeta) => setAutocompleteFilter(newValue)}	
						/>
						<span slot="error">{errors.itemNameError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput

							value={stocksState.draft.harvest_method}
							placeholder={intl.formatMessage({ id: "Harvest method", defaultMessage: "Harvest method" })}
							onIonChange={e => dispatch.stock.updateDraft({ ...stocksState.draft, harvest_method: e.detail.value ? e.detail.value : undefined })}
						// disabled
						/>
					</div>

					<div className="item-container">
						<StyledInput

							value={stocksState.draft.complementary_info1}
							placeholder={intl.formatMessage({ id: "Complemen.info", defaultMessage: "Complemen.info" })}
							// disabled
							onIonChange={e => dispatch.stock.updateDraft({ ...stocksState.draft, complementary_info1: e.detail.value ? e.detail.value : undefined })}
						/>
					</div>
					<div className="item-container">

						<StyledInput

							value={stocksState.draft.complementary_info2}
							placeholder={intl.formatMessage({ id: "Complemen.info", defaultMessage: "Complemen.info" }) + '2'}
							onIonChange={e => dispatch.stock.updateDraft({ ...stocksState.draft, complementary_info2: e.detail.value ? e.detail.value : undefined })}
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
