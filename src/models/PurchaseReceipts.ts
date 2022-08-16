import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface PurchaseReceipt {
	id?: number | undefined;
	supplier?: string | undefined;
	licensePlate?: string | undefined;
	date?: string | undefined;
	INN?: string | undefined;
	item?: string | undefined;
	stock?: string | undefined;
	weight_car_item?: number | undefined;
	weight_car?: number | undefined;
	weight_product?: number | undefined;
	harvestMethod?: string | undefined;
	status?: 'received' | 'lab-accepted' | 'truck-left' | 'rejected' | undefined
}

export const purchaseReceipts = createModel<RootModel>()({
	state: {
		draft: {} as PurchaseReceipt,
		receipts: [] as PurchaseReceipt[],
	}, // initial state
	reducers: {
		// handle state changes with pure functions
		saveDraft(state) {
			
			return {
				receipts: [...state.receipts, state.draft],
				draft: {},
			};
		},
		updateDraft(state, payload: PurchaseReceipt) {
			return {
				...state,
				draft: {
					...state.draft,
					...payload,
				},
			};
		},
		removeDraft(state) {

			return {
				...state,
				draft: {},
			};
		},
		updateReceipt(state, payload: { index: number; receipt: PurchaseReceipt}) {

			const { index, receipt } = payload;
			const receipts = [...state.receipts];
			receipts[index] = { ...receipts[index], ...receipt };
			return {
				...state,
				receipts,
			};
		}

	},
	effects: (dispatch) => ({
		// handle state changes with impure functions.
		// use async/await for async actions
		async incrementAsync(payload: number, state) {
			console.log("This is current root state", state);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// dispatch.count.increment(payload);
		},
	}),
});