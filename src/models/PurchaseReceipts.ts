import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { PurchaseReceipt } from "../types/PurchaseReceipt.type";
import { FrappeRequestManager } from "../util/FrappeNode";

// purchace receipt type excluding step
type PurchaseReceiptData = Omit<PurchaseReceipt, "step">;

export const purchaseReceipts = createModel<RootModel>()({
	state: {
		draft: null,
		// receipts: [] as PurchaseReceipt[],
	} as {
		draft: PurchaseReceipt | null;
		// receipts: PurchaseReceipt[];
	}, // initial state
	reducers: {
		// handle state changes with pure functions
		updateDraft(state, payload: PurchaseReceiptData) {

			const draft: PurchaseReceipt = { ...(state.draft || { step: 'Undefined' }), ...payload, }

			return {
				...state,
				draft
			};
		},
		removeDraft(state) {

			return {
				...state,
				draft: null,
			};
		},
		// updateReceipt(state, payload: { index: number; receipt: PurchaseReceipt}) {

		// 	const { index, receipt } = payload;
		// 	const receipts = [...state.receipts];
		// 	receipts[index] = { ...receipts[index], ...receipt };
		// 	return {
		// 		...state,
		// 		receipts,
		// 	};
		// }

	},
	effects: (dispatch) => ({
		// handle state changes with impure functions.
		// use async/await for async actions

		async submitPR(payload: PurchaseReceipt, state) {
			
			try { 
				const resp = await FrappeRequestManager.addDocument('Purchase Receipt', payload);
				dispatch.purchaseReceipts.removeDraft();
				return resp;
			} catch (err) {
				throw err;
			}
			// dispatch.count.increment(payload);
		},
		async editPR(payload: { name: string; pr: PurchaseReceipt}, state) {

			try {
				const resp = await FrappeRequestManager.editDocument('Purchase Receipt', payload.name, payload.pr);
				return resp;
			} catch (err) {
				throw err;
			}
			// dispatch.count.increment(payload);
		}
	}),
});