import { useState } from 'react';
import {
	IonPage,
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
import { FrappeRequestManager } from '../../util/FrappeNode';
import StyledAutocomplete from '../../theme/components/Autocomplete';
import { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import { PurchaseReceipt } from '../../types/PurchaseReceipt.type';
import { useIntl } from 'react-intl';

const Truck: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const purchaseReceiptsState = useSelector((state: RootState) => state.purchaseReceipts);
	const history = useHistory();
	const intl = useIntl();

	const [errors, setError] = useState<{
		supplierError: string | undefined;
		INNError: string | undefined;
		weightError: string | undefined;
		// harvestError: string | undefined;
	}>({
		supplierError: undefined,
		INNError: undefined,
		weightError: undefined,
		// harvestError: undefined,
	})

	// const [suppliers, setSuppliers] = useState<{ name: string }[]>([]);

	// useEffect(() => {

	// 	loadSuppliers();
	// }, []);

	const loadSuppliers = async (search: string, loadedOptions: OptionsOrGroups<unknown, GroupBase<unknown>>) => {

		try {

			const resp = await FrappeRequestManager.listDocuments('Supplier', [], [['Supplier', 'name', 'like', `%${search}%`]], loadedOptions.length, 50);
			// setSuppliers(resp.data.data);
			console.log(resp.data);

			const options = {
				options: resp.data.data.map((supplier: { name: string }) => ({ value: supplier.name, label: supplier.name })),
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

	const loadItems = async (search: string, loadedOptions: OptionsOrGroups<unknown, GroupBase<unknown>>) => {

		try {

			const resp = await FrappeRequestManager.listDocuments('Item', [], [['Item', 'name', 'like', `%${search}%`]], loadedOptions.length, 50);
			// setSuppliers(resp.data.data);
			console.log(resp.data);

			const options = {
				options: resp.data.data.map((supplier: { name: string }) => ({ value: supplier.name, label: supplier.name })),
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

	const proceed = () => {

		let supplierError: string | undefined = undefined;
		let INNError: string | undefined = undefined;
		let weightError: string | undefined = undefined;
		// let harvestError: string | undefined = undefined;

		if (purchaseReceiptsState.draft?.supplier === "" || purchaseReceiptsState.draft?.supplier === undefined) {

			supplierError = "Supplier field need to be filled!";
		}

		if (purchaseReceiptsState.draft?.lr_no === "" || purchaseReceiptsState.draft?.lr_no === undefined) {

			INNError = "INN field need to be filled!";
		}
		if (purchaseReceiptsState.draft?.truck_weight === 0 || purchaseReceiptsState.draft?.truck_weight === undefined) {

			weightError = "Weight field need to be filled!";
		}

		// if (purchaseReceiptsState.draft.harvestMethod === "" || purchaseReceiptsState.draft.harvestMethod === undefined) {

		// 	harvestError = "Harvest Method field need to be filled!";
		// }

		const errs = {
			supplierError,
			INNError,
			weightError,
			// harvestError
		};

		setError(errs);

		console.log('pr', purchaseReceiptsState.draft);

		if (purchaseReceiptsState.draft?.supplier && purchaseReceiptsState.draft?.truck_weight/*  && purchaseReceiptsState.draft.harvestMethod */) {

			// dispatch.purchaseReceipts.updateDraft({
			// 	status: 'received'
			// });

			submitToServer();
		}
	};

	const submitToServer = async () => {

		// guard check draft not to be null

		if (purchaseReceiptsState.draft) {
			const submitForm: PurchaseReceipt = {
				lr_no: purchaseReceiptsState.draft.lr_no,
				total_weight: purchaseReceiptsState.draft.truck_weight,
				supplier: purchaseReceiptsState.draft.supplier,
				items: purchaseReceiptsState.draft.items,
				step: 'Check-in'
			};

			try {

				const resp = await dispatch.purchaseReceipts.submitPR(submitForm);
				console.log(resp);
				history.push("/tabs");
			} catch (err) {

				console.error(err);
			}
		}

	};

	// const customStyles: StylesConfig = {

	// 	container: () => ({
	// 		// none of react-select's styles are passed to <Control />
	// 		width: '100%',
	// 		zIndex: 1000,
	// 	}),
	// }

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
						<StyledAutocomplete
							// <{ name: string }>
							// styles={customStyles}
							// styles={{}}
							placeholder={intl.formatMessage({ id: "Select Supplier", defaultMessage: "Select Supplier" })}
							value={purchaseReceiptsState.draft?.supplier ? { value: purchaseReceiptsState.draft?.supplier, label: purchaseReceiptsState.draft?.supplier } : undefined}
							loadOptions={(inputValue, loadedOptions) => loadSuppliers(inputValue, loadedOptions)}
							onChange={(newValue, actionMeta) => {
								console.log(newValue);
								dispatch.purchaseReceipts.updateDraft({ supplier: newValue ? (newValue as { label: string; value: string; }).value : undefined })
							}}
						// onInputChange={(newValue, actionMeta) => setAutocompleteFilter(newValue)}	
						/>
						{/* <StyledSelect
							style={{ width: '100%' }}
							value={purchaseReceiptsState.draft.supplier}
							placeholder="Select Supplier"
							multiple={false}
							onIonChange={e => dispatch.purchaseReceipts.updateDraft({ supplier: e.detail.value ? e.detail.value : undefined })}
						>
							{suppliers.map(supplier => (<IonSelectOption value={supplier.name} key={supplier.name}>{supplier.name}</IonSelectOption>))}
						</StyledSelect> */}

						<span slot="error">{errors.supplierError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							value={purchaseReceiptsState.draft?.lr_no}
							placeholder={intl.formatMessage({ id: "INN", defaultMessage: "INN" })}
							disabled
						/>
						<span slot="error">{errors.INNError || ''}</span>
					</div>
					<div className="item-container">
						<StyledInput
							type="number"
							value={purchaseReceiptsState.draft?.truck_weight}
							placeholder={intl.formatMessage({ id: "Truck Weight", defaultMessage: "Truck Weight" })}
							onIonChange={e => dispatch.purchaseReceipts.updateDraft({ truck_weight: e.detail.value ? parseFloat(e.detail.value) : undefined })}
						/>
						<span slot="error">{errors.weightError || ''}</span>
					</div>
					{/* <IonItem className={errors.harvestError ? 'ion-invalid' : ''}>
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
					</IonItem> */}
					<div className="item-container">
						<StyledAutocomplete
							// <{ name: string }>
							// styles={customStyles}
							placeholder={intl.formatMessage({ id: "Select Item", defaultMessage: "Select Item" })}
							value={(purchaseReceiptsState.draft?.items?.length || 0) > 0 ? { value: purchaseReceiptsState.draft?.items![0].item_code, label: purchaseReceiptsState.draft?.items![0].item_code } : undefined}
							loadOptions={(inputValue, loadedOptions) => loadItems(inputValue, loadedOptions)}
							onChange={(newValue, actionMeta) => {
								console.log(newValue);
								dispatch.purchaseReceipts.updateDraft({ items: newValue ? [{ item_code: (newValue as { label: string; value: string; }).value }] : undefined })
							}}
						// onInputChange={(newValue, actionMeta) => setAutocompleteFilter(newValue)}	
						/>
						{/* <StyledSelect
							style={{ width: '100%' }}
							value={purchaseReceiptsState.draft.supplier}
							placeholder="Select Supplier"
							multiple={false}
							onIonChange={e => dispatch.purchaseReceipts.updateDraft({ supplier: e.detail.value ? e.detail.value : undefined })}
						>
							{suppliers.map(supplier => (<IonSelectOption value={supplier.name} key={supplier.name}>{supplier.name}</IonSelectOption>))}
						</StyledSelect> */}

						<span slot="error">{errors.supplierError || ''}</span>
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

export default Truck;
