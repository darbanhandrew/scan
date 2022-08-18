import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface Stock {
	id?: number | undefined;
	source?: string | undefined;
	supplier?: string | undefined;
	licensePlate?: string | undefined;
	date?: string | undefined;
	item?: string | undefined;
	stock?: string | undefined;
	weight_car_item?: number | undefined;
	weight_car?: number | undefined;
	weight_product?: number | undefined;
	driver_name?: string | undefined;
	driver_phone?: string | undefined;
	destination?: string | undefined;
	child_stock_number?: string | undefined;
	complement_info1?: string | undefined;
	complement_info2?: string | undefined;
	qr_base64?: string | undefined;
	harvestMethod?: string | undefined;
	status?: 'initiated' | 'cargo-underway1' | 'cargo-underway2' | 'cargo-transferred' | undefined
}

export const stock = createModel<RootModel>()({
	state: {
		draft: {} as Stock,
		active: {} as Stock,
		items: [] as Stock[],
	}, // initial state
	reducers: {
		// handle state changes with pure functions
		saveDraft(state) {

			return {
				...state,
				items: [...state.items, state.draft],
				draft: {},
			};
		},
		updateDraft(state, payload: Stock) {
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
		updateStock(state, payload: { index: number; item: Stock }) {

			const { index, item } = payload;
			const items = [...state.items];
			items[index] = { ...items[index], ...item };
			return {
				...state,
				items,
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