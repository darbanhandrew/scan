import { useState } from 'react';
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
	useIonViewWillEnter
} from "@ionic/react";
import "./receiptList.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch, RootState } from "../../store";

const ReceiptList: React.FC = () => {

	const purchaseReceiptsState = useSelector((state: RootState) => state.purchaseReceipts);

	// const pushData = () => {
	// 	const max = data.length + 20;
	// 	const min = max - 20;
	// 	const newData = [];
	// 	for (let i = min; i < max; i++) {
	// 		newData.push('Item' + i);
	// 	}

	// 	setData([
	// 		...data,
	// 		...newData
	// 	]);
	// }
	// const loadData = (ev: any) => {
	// 	setTimeout(() => {
	// 		pushData();
	// 		console.log('Loaded data');
	// 		ev.target.complete();
	// 	}, 500);
	// }

	// useIonViewWillEnter(() => {
	// 	pushData();
	// });

	return (
		<IonPage className="receiptList">
			<IonContent className="list">
				<IonList>
					{purchaseReceiptsState && purchaseReceiptsState.receipts && purchaseReceiptsState.receipts.length > 0 && purchaseReceiptsState.receipts.map((item, index) => {
						return (
							<IonItem key={index} href={item.status === 'received'
								? `/receipt/${index}`
								: item.status === 'lab-accepted'
									? `/check-out/${index}`
									: '/receiptList'}>
								<IonChip
									color={
										item.status === 'received'
											? 'primary'
											: item.status === 'lab-accepted'
											? 'success'
											: item.status === 'rejected'
											? 'danger'
											: item.status === 'truck-left'
											? 'tertiary'
											: 'medium'
									}
								>
									{item.status || 'Unknown'}
								</IonChip>
								<IonLabel>{item.supplier || ''} {Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: 'narrow', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(item.date !== undefined ? new Date(item.date) : new Date())}</IonLabel>
							</IonItem>
						)
					})}
				</IonList>

				<IonInfiniteScroll
					// onIonInfinite={loadData}
					threshold="100px"
					disabled={true}
				>
					<IonInfiniteScrollContent
						loadingSpinner="bubbles"
						loadingText="Loading more data..."
					/>
				</IonInfiniteScroll>
			</IonContent>
		</IonPage>
	);
};

export default ReceiptList;
