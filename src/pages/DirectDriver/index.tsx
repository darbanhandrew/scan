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
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./directDriver.css";

const DirectDriver: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();

	const [errors, setError] = useState<{
		supplierError: string | undefined;
		itemError: string | undefined;
		weightError: string | undefined;	
	}>({
		supplierError: undefined,
		itemError: undefined,
		weightError: undefined,
	})

	const params = useParams<{ index: string | undefined }>();

	const [loading, setLoading] = useState(true);


	useEffect(() => {

		const index = parseInt(params.index || '0')
		if (index >= 0 && index < stocksState.items.length) {
			setLoading(false);
		}
	}, [params, stocksState]);

	const proceed = () => {

		let supplierError: string | undefined = undefined;
		let itemError: string | undefined = undefined;
		let weightError: string | undefined = undefined;

		if (stocksState.items[parseInt(params.index || "0")].supplier === "" || stocksState.items[parseInt(params.index || "0")].supplier === undefined) {

			supplierError = "Supplier field need to be filled!";
		}

		if (stocksState.items[parseInt(params.index || "0")].item === "" || stocksState.items[parseInt(params.index || "0")].item === undefined) {

			itemError = "Item field need to be filled!";
		}
		if (stocksState.items[parseInt(params.index || "0")].weight_car === 0 || stocksState.items[parseInt(params.index || "0")].weight_car === undefined) {

			weightError = "Weight (empty truck) field need to be filled!";
		}

		const errs = {
			supplierError,
			itemError,
			weightError,
		};

		setError(errs);

		if (stocksState.items[parseInt(params.index || "0")].supplier && stocksState.items[parseInt(params.index || "0")].item && stocksState.items[parseInt(params.index || "0")].licensePlate && stocksState.items[parseInt(params.index || "0")].weight_car) {

			dispatch.stock.updateStock({
				index: parseInt(params.index || "0"), item: {
					status: 'cargo-transferred',
					weight_product: (stocksState.items[parseInt(params.index || "0")].weight_car_item || 0) - (stocksState.items[parseInt(params.index || "0")].weight_car || 0),
				}
			});
			history.push("/home");

		}
	}

	if (loading) return (<IonPage />);

	return (
		<IonPage className="truck">
			<IonList className="list">
				<IonItem className={errors.supplierError ? 'ion-invalid' : ''}>
					<IonLabel>From:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].supplier}
						placeholder="Select Supplier"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { supplier: e.detail.value ? e.detail.value : undefined } })}
					/>
					<span slot="error">{errors.supplierError || ''}</span>
				</IonItem>
				<IonItem className={errors.itemError ? 'ion-invalid' : ''}>
					<IonLabel>Item:</IonLabel>
					<IonInput
						value={stocksState.items[parseInt(params.index || "0")].item}
						placeholder="Item"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { item: e.detail.value ? e.detail.value : undefined } })}
					/>
					<span slot="error">{errors.itemError || ''}</span>
				</IonItem>
				<IonItem className={errors.weightError ? 'ion-invalid' : ''}>
					<IonLabel>Weight (empty truck):</IonLabel>
					<IonInput
						type="number"
						value={stocksState.items[parseInt(params.index || "0")].weight_car}
						placeholder="Weight (empty truck)"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { weight_car: e.detail.value ? parseFloat(e.detail.value) : undefined } })}
					/>
					<span slot="error">{errors.weightError || ''}</span>
				</IonItem>
				<IonItem>
					<IonLabel>Weight (product):</IonLabel>
					<IonInput
						value={(stocksState.items[parseInt(params.index || "0")].weight_car_item || 0) - (stocksState.items[parseInt(params.index || "0")].weight_car || 0)}
						placeholder="Stock"
					/>
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

export default DirectDriver;
