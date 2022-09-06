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
import { Dispatch, RootState } from "../../../store";
import "./sendItemDest.css";
import { StockEntry } from '../../../types/StockEntry.type';

const TestResult: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const stocksState = useSelector((state: RootState) => state.stock);
	const history = useHistory();
	const params = useParams<{ docname: string | undefined }>();
	
	const [stockEntry, setStockEntry] = useState<StockEntry>();
	const [loading, setLoading] = useState(true);

	const [errors, setError] = useState<{
		humidityError: string | undefined;
		purityError: string | undefined;
	}>({
		humidityError: undefined,
		purityError: undefined,
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

	// const proceed = () => {

	// 	let humidityError: string | undefined = undefined;
	// 	let purityError: string | undefined = undefined;

	// 	if (stockEntry.humidity === "" || stockEntry.humidity === undefined) {

	// 		humidityError = "Median humidity field need to be filled!";
	// 	}

	// 	if (stockEntry.purity === "" || stockEntry.purity === undefined) {

	// 		purityError = "Purity field need to be filled!";
	// 	}
	// 	const errs = {
	// 		humidityError,
	// 		purityError,
	// 	};

	// 	setError(errs);

	// 	if (stockEntry.humidity && stockEntry.purity) {

	// 		dispatch.stock.updateStock({
	// 			index: parseInt(params.index || "0"), item: {
	// 				status: 'lab-report',
	// 			}
	// 		});
	// 		history.push(`/list`);

	// 	}
	// }

	if (loading) return (<IonPage />)

	return (
		<IonPage className="test">
			{/* <IonList className="list">
				<IonItem>
					<IonLabel>Supplier:</IonLabel>
					<IonInput
						value={stockEntry.supplier}
						placeholder="Supplier"
						disabled
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Item:</IonLabel>
					<IonInput
						value={stockEntry.item}
						placeholder="Item"
						disabled
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Complemen.info:</IonLabel>
					<IonInput
						value={stockEntry.complement_info1}
						placeholder="Complemen.info"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { complement_info1: e.detail.value ? e.detail.value : undefined } })}
					/>
				</IonItem>
				<IonItem>
					<IonLabel>Complemen.info2:</IonLabel>
					<IonInput
						value={stockEntry.complement_info2}
						placeholder="Complemen.info2"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { complement_info2: e.detail.value ? e.detail.value : undefined } })}
					/>
				</IonItem>
				<IonItem className={errors.humidityError ? 'ion-invalid' : ''}>
					<IonLabel>Median humidity:</IonLabel>
					<IonInput
						value={stockEntry.humidity}
						placeholder="Median humidity"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { humidity: e.detail.value ? e.detail.value : undefined } })}
					/>
					<span slot="error">{errors.humidityError || ''}</span>
				</IonItem>
				<IonItem className={errors.purityError ? 'ion-invalid' : ''}>
					<IonLabel>Purity:</IonLabel>
					<IonInput
						value={stockEntry.purity}
						placeholder="Purity"
						onIonChange={e => dispatch.stock.updateStock({ index: parseInt(params.index || "0"), item: { purity: e.detail.value ? e.detail.value : undefined } })}
					/>
					<span slot="error">{errors.purityError || ''}</span>
				</IonItem>
				<IonItem lines="none" style={{ marginTop: '24px' }}>
					<IonButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
						Confirm
					</IonButton>
				</IonItem>
			</IonList> */}
		</IonPage>
	);
};

export default TestResult;
