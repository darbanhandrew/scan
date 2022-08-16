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
	IonSegmentButton
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./receipt.css";

const Receipt: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const purchaseReceiptsState = useSelector((state: RootState) => state.purchaseReceipts);
	const history = useHistory();
	const params = useParams<{ index: string | undefined }>();

	const [loading, setLoading] = useState(true);
	
	const [errors, setError] = useState<{
		supplierError: string | undefined;
		itemError: string | undefined;
		stockError: string | undefined;
	}>({
		supplierError: undefined,
		itemError: undefined,
		stockError: undefined,
	})

	useEffect(() => {

		const index = parseInt(params.index || '0')
		if (index >= 0 && index < purchaseReceiptsState.receipts.length) {
			setLoading(false);
		}
	}, [params, purchaseReceiptsState])

	const proceed = () => {

		let supplierError: string | undefined = undefined;
		let itemError: string | undefined = undefined;
		let stockError: string | undefined = undefined;
		
		

		if (purchaseReceiptsState.receipts[parseInt(params.index || "0")].supplier === "" || purchaseReceiptsState.receipts[parseInt(params.index || "0")].supplier === undefined) {

			supplierError = "Supplier field need to be filled!";
		}

		if (purchaseReceiptsState.receipts[parseInt(params.index || "0")].item === "" || purchaseReceiptsState.receipts[parseInt(params.index || "0")].item === undefined) {

			itemError = "Item field need to be filled!";
		}
		if (purchaseReceiptsState.receipts[parseInt(params.index || "0")].stock === "" || purchaseReceiptsState.receipts[parseInt(params.index || "0")].stock === undefined) {

			stockError = "Stock field need to be filled!";
		}

		const errs = {
			supplierError,
			itemError,
			stockError,
		};

		setError(errs);

		if (purchaseReceiptsState.receipts[parseInt(params.index || "0")].supplier && purchaseReceiptsState.receipts[parseInt(params.index || "0")].item && purchaseReceiptsState.receipts[parseInt(params.index || "0")].stock) {

			dispatch.purchaseReceipts.updateReceipt({
				index: parseInt(params.index || "0"), receipt: {
				status: 'lab-accepted'
			}});
			history.push("/home");

		}
	}

	if (loading) return (<IonPage />)

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem className={errors.supplierError ? 'ion-invalid' : ''}>
					<IonLabel>Supplier:</IonLabel>
					<IonInput
						value={purchaseReceiptsState.receipts[parseInt(params.index || "0")].supplier}
						placeholder="Select Supplier"
						onIonChange={e => dispatch.purchaseReceipts.updateReceipt({ index: parseInt(params.index || "0"), receipt: { supplier: e.detail.value ? e.detail.value : undefined }})}
					/>
					<span slot="error">{errors.supplierError || ''}</span>
				</IonItem>
				<IonItem className={errors.itemError ? 'ion-invalid' : ''}>
					<IonLabel>Item:</IonLabel>
					<IonInput
						value={purchaseReceiptsState.receipts[parseInt(params.index || "0")].item}
						placeholder="Item"
						onIonChange={e => dispatch.purchaseReceipts.updateReceipt({ index: parseInt(params.index || "0"), receipt: { item: e.detail.value ? e.detail.value : undefined }})}
					/>
					<span slot="error">{errors.itemError || ''}</span>
				</IonItem>
				<IonItem className={errors.stockError ? 'ion-invalid' : ''}>
					<IonLabel>Choose stock:</IonLabel>
					<IonInput
						value={purchaseReceiptsState.receipts[parseInt(params.index || "0")].stock}
						placeholder="Stock"
						onIonChange={e => dispatch.purchaseReceipts.updateReceipt({ index: parseInt(params.index || "0"), receipt: { stock: e.detail.value ? e.detail.value : undefined }})}
					/>
					<span slot="error">{errors.stockError || ''}</span>
				</IonItem>
				<IonItem lines="none" style={{ marginTop: '24px' }}>
					<IonButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
						Confirm
					</IonButton>
				</IonItem>
			</IonList>
		</IonPage>
	);
};

export default Receipt;
