import { useEffect, useState } from 'react';
import {
	IonContent,
	IonImg,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonList,
	IonPage,
	IonText,
	useIonViewWillEnter
} from "@ionic/react";
import "./receiptList.css";

import { useHistory } from "react-router";
import { PurchaseReceipt } from '../../types/PurchaseReceipt.type';
import { FrappeRequestManager } from '../../util/FrappeNode';

import NewStatusIcon from '../../assets/icons/NewStatusIcon.svg';
import ProcessingStatusIcon from '../../assets/icons/ProcessingStatusIcon.svg';
import CanceledStatusIcon from '../../assets/icons/CanceledStatusIcon.svg';
import DoneStatusIcon from '../../assets/icons/DoneStatusIcon.svg';
import { useIntl } from 'react-intl';

// handle different purchase receipt statuses
// step ?: 'Draft' | 'Check-in' | 'Unloading' | 'To Bill' | 'Completed' | 'Return Issued' | 'Cancelled' | 'Closed';
const statusMap = {
	"Check-in": {
		color: "#ECFFF1",
		text: "Check In",
		icon: NewStatusIcon,
		link: (docname: string) => { return `/tabs/receipt/${docname}`; }
	},
	"Unloading": {
		color: "#9692DD",
		text: "Unloading",
		icon: ProcessingStatusIcon,
		link: (docname: string) => { return `/tabs/check-out/${docname}`; }
	},
	"Check-out": {
		color: "#ADADAD",
		text: "Completed",
		icon: DoneStatusIcon,
		link: (docname: string) => { return "/tabs/list"; }
	},
	"Undefined": {
		color: "#F8E9EA",
		text: "Closed",
		icon: CanceledStatusIcon,
		link: (docname: string) => { return "/tabs/list"; }
	}
};


const ReceiptList: React.FC = () => {

	// const purchaseReceiptsState = useSelector((state: RootState) => state.purchaseReceipts);
	// const stocksState = useSelector((state: RootState) => state.stock);
	// const [selectedSegment, setSelectedSegment] = useState<string>('receipts');
	const history = useHistory();
	const intl = useIntl();
	const [receipts, setReceipts] = useState<PurchaseReceipt[]>([]);
	const [loading, setLoading] = useState<boolean>(false);


	useEffect(() => {

		setLoading(true);
		console.log('loading!')
	}, []);

	const loadData = async (ev?: any) => {

		try {
			const resp = await FrappeRequestManager.listDocuments('Purchase Receipt', ["step", "supplier", "creation", "name"], [], receipts.length);

			setReceipts([
				...receipts,
				...resp.data.data,
			]);
			setLoading(false);
			ev?.target.complete();
		} catch (err) {
			console.log(err);
		}
	};


	const convertTime = (pr: PurchaseReceipt) => {

		if (pr.creation) {
			const timeString = (pr.creation + 'Z').replace(/-/g, '/').replaceAll(' ', 'T').replaceAll('/', '-');
			const date = new Date(timeString) || new Date();
			// if date was valid
			if (date.toString() !== 'Invalid Date') {

				const result = Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: 'narrow', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date);

				return result;
			}

			return 'Invalid Date';
		}

		return 'err';
	};




	useIonViewWillEnter(() => {
		loadData();
	});

	if (loading) {
		return (
			<IonPage>
				<IonContent>
					Loading...
				</IonContent>
			</IonPage>
		);
	}

	return (
		<IonPage className="receiptList">
			<IonContent className="list">
				<IonList >
					{receipts.map((item, index) => {
						return (

							<div className="item-c" key={index} onClick={() => history.push(item.step && item.name ? statusMap[item.step].link(item.name) : '/tabs/list')} >
								<div className="chip" style={{ background: statusMap[item.step || 'Undefined'].color }}>
									<IonImg src={statusMap[item.step || 'Undefined'].icon} />
								</div>
								<IonText>
									{item.step}
									{' '}
									{item.supplier || ''}
									{' '}
									{convertTime(item)}
								</IonText>
							</div>

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
