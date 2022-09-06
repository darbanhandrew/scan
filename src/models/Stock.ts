import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { StockEntry } from "../types/StockEntry.type";
import { FrappeRequestManager } from "../util/FrappeNode";

export const stock = createModel<RootModel>()({
	state: {
		draft: {} as StockEntry,
		active: {} as StockEntry,
	}, // initial state
	reducers: {
		// handle state changes with pure functions
		
		updateDraft(state, payload: StockEntry) {
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

	},
	effects: (dispatch) => ({
		// handle state changes with impure functions.
		// use async/await for async actions

		async submitSE(payload: StockEntry, state) {

			try {
				const resp = await FrappeRequestManager.addDocument('Stock Entry', payload);
				dispatch.purchaseReceipts.removeDraft();
				return resp;
			} catch (err) {
				throw err;
			}
			// dispatch.count.increment(payload);
		},
		async editSE(payload: { name: string; se: StockEntry }, state) {

			try {
				const resp = await FrappeRequestManager.editDocument('Stock Entry', payload.name, payload.se);
				return resp;
			} catch (err) {
				throw err;
			}
			// dispatch.count.increment(payload);
		},
		async getSE(payload: { name: string, fields: string[] }, state) {


			try {
				const resp = await FrappeRequestManager.getDocument('Stock Entry', payload.name, payload.fields);
				return resp;
			} catch (err) {
				throw err;
			}
			// dispatch.count.increment(payload);
		}
	}),
});