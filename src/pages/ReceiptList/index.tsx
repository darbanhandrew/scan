import { useEffect, useState } from 'react';
import {
	IonButton,
	IonChip,
	IonContent,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonSegment,
	IonSegmentButton,
	useIonViewWillEnter
} from "@ionic/react";
import "./receiptList.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch, RootState } from "../../store";
import { PurchaseReceipt } from '../../types/PurchaseReceipt.type';
import { FrappeRequestManager } from '../../util/FrappeNode';

const ReceiptList: React.FC = () => {

	// const purchaseReceiptsState = useSelector((state: RootState) => state.purchaseReceipts);
	// const stocksState = useSelector((state: RootState) => state.stock);
	// const [selectedSegment, setSelectedSegment] = useState<string>('receipts');
	const history = useHistory();

	const [receipts, setReceipts] = useState<PurchaseReceipt[]>([]);
	// const 


	useEffect(() => {

	}, []);



	const pushData = (newData: PurchaseReceipt[]) => {
		
		setReceipts([
			...receipts,
			...newData
		]);
	};

	const loadData = async (ev?: any) => {

		try {
			const resp = await FrappeRequestManager.listDocuments('Purchase Receipt', ["*"], [], receipts.length);

			setReceipts([
				...receipts,
				...resp.data.data,
			]);

			ev?.target.complete();
		} catch (err) {
			console.log(err);
		}
	}

	useIonViewWillEnter(() => {
		loadData();
	});

	return (
		<IonPage className="receiptList">
			<IonContent className="list">
				<IonList>
					{receipts.map((item, index) => {
						return (
							<IonItem key={index} onClick={() => history.push(item.status === 'To Bill'
								? `/tabs/receipt/${index}`
								: item.status === 'Completed'
									? `/tabs/check-out/${index}`
									: '/tabs/list')}>
								<IonChip
									color={
										item.status === 'To Bill'
											? 'primary'
											: item.status === 'Completed'
												? 'success'
												: item.status === 'Return Issued'
													? 'danger'
													: item.status === 'Draft'
														? 'tertiary' : item.status === 'Cancelled' ? 'danger' : 'warning'
									}
								>
									{item.status || 'Unknown'}
								</IonChip>
								<IonLabel>
									{item.supplier || ''} {/* {Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: 'narrow', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(item.posting_date !== undefined && item.posting_time !== undefined ? new Date(`${item.posting_date}T${item.posting_time}`) : new Date())} */}
								</IonLabel>
							</IonItem>
						)
					})}
				</IonList>



				<IonInfiniteScroll
					onIonInfinite={loadData}
					threshold="100px"
					disabled={true}
				>
					<IonInfiniteScrollContent
						loadingSpinner="bubbles"
						loadingText="Loading more data..."
					/>
				</IonInfiniteScroll>
			</IonContent>
		</IonPage >
	);

	// return (
	// 	<IonPage className="receiptList">
	// 		<IonContent className="list">
	// 			<IonItem>
	// 				<IonSegment
	// 					onIonChange={e => setSelectedSegment(e.detail.value ? e.detail.value : 'receipts')}
	// 					value={selectedSegment}
	// 				>
	// 					<IonSegmentButton value="receipts">
	// 						<IonLabel>Receipts</IonLabel>
	// 					</IonSegmentButton>
	// 					<IonSegmentButton value="stock">
	// 						<IonLabel>Stock</IonLabel>
	// 					</IonSegmentButton>
	// 				</IonSegment>
	// 			</IonItem>
	// 			{
	// 				selectedSegment === 'receipts' ? (<IonList>
	// 					{purchaseReceiptsState && purchaseReceiptsState.receipts && purchaseReceiptsState.receipts.length > 0 && purchaseReceiptsState.receipts.map((item, index) => {
	// 						return (
	// 							<IonItem key={index} onClick={() => history.push(item.status === 'received'
	// 								? `/tabs/receipt/${index}`
	// 								: item.status === 'lab-accepted'
	// 									? `/tabs/check-out/${index}`
	// 									: '/tabs/list')}>
	// 								<IonChip
	// 									color={
	// 										item.status === 'received'
	// 											? 'primary'
	// 											: item.status === 'lab-accepted'
	// 												? 'success'
	// 												: item.status === 'rejected'
	// 													? 'danger'
	// 													: item.status === 'truck-left'
	// 														? 'tertiary'
	// 														: 'medium'
	// 									}
	// 								>
	// 									{item.status || 'Unknown'}
	// 								</IonChip>
	// 								<IonLabel>
	// 									{item.supplier || ''} {Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: 'narrow', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(item.posting_date !== undefined && item.posting_time !== undefined ? new Date(`${item.posting_date}T${item.posting_time}`) : new Date())}
	// 								</IonLabel>
	// 							</IonItem>
	// 						)
	// 					})}
	// 				</IonList>) : (<IonList>
	// 					{stocksState && stocksState.items && stocksState.items.length > 0 && stocksState.items.map((item, index) => {
	// 						return (
	// 							<IonItem key={index} onClick={() => history.push(item.status === 'initiated'
	// 								? `/tabs/send-item-dest/${index}`
	// 								: item.status === 'cargo-underway1'
	// 									? `/tabs/scan-result/${index}`
	// 									: `/tabs/direct-driver/${index}`)}>
	// 								<IonChip
	// 									color={
	// 										item.status === 'initiated'
	// 											? 'primary'
	// 											: item.status === 'cargo-underway1'
	// 												? 'success'
	// 												: item.status === 'cargo-underway2'
	// 													? 'danger'
	// 													: item.status === 'cargo-transferred'
	// 														? 'tertiary'
	// 														: item.status === 'lab-report'
	// 															? 'secondary'
	// 															: 'medium'
	// 									}
	// 								>
	// 									{item.status || 'Unknown'}
	// 								</IonChip>
	// 								<IonLabel>{item.destination || ''} {Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: 'narrow', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(item.date !== undefined ? new Date(item.date) : new Date())}</IonLabel>
	// 							</IonItem>
	// 						)
	// 					})}
	// 				</IonList>)
	// 			}


	// 			<IonInfiniteScroll
	// 				onIonInfinite={loadData}
	// 				threshold="100px"
	// 				disabled={true}
	// 			>
	// 				<IonInfiniteScrollContent
	// 					loadingSpinner="bubbles"
	// 					loadingText="Loading more data..."
	// 				/>
	// 			</IonInfiniteScroll>
	// 		</IonContent>
	// 	</IonPage >
	// );
};

export default ReceiptList;
