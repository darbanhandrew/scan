import { Models } from '@rematch/core';
import { purchaseReceipts } from './PurchaseReceipts';
import { stock } from './Stock';
import { auth } from './Auth';


export interface RootModel extends Models<RootModel> {
		purchaseReceipts: typeof purchaseReceipts;
		stock: typeof stock;
		auth: typeof auth;
}

export const models: RootModel = { purchaseReceipts, stock, auth };