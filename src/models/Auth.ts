import { createModel } from "@rematch/core";
import { RootModel } from ".";


export const auth = createModel<RootModel>()({
	state: {
		userType: null,
		prefix: null,
	} as {
		userType: string | null;
		prefix: string | null;
	},  // initial state
	reducers: {
		// handle state changes with pure functions
		login(state, payload: { userType: string; prefix: string; }) {

			const { userType, prefix } = payload;
			return { ...state, userType, prefix };
		},
		logout() {
			return { userType: null, prefix: null };
		},

	},
	effects: (dispatch) => ({
		// handle state changes with impure functions.
		// use async/await for async actions

		// async submitSE(payload: Stock, state) {

		// 	try {
		// 		const resp = await FrappeRequestManager.addDocument('Stock Entry', payload);
		// 		dispatch.purchaseReceipts.removeDraft();
		// 		return resp;
		// 	} catch (err) {
		// 		throw err;
		// 	}
		// 	// dispatch.count.increment(payload);
		// },
	}),
});