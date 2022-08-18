import { Models } from '@rematch/core';
import { purchaseReceipts } from './PurchaseReceipts';
import { stock } from './Stock';


export interface RootModel extends Models<RootModel> {
		purchaseReceipts: typeof purchaseReceipts;
		stock: typeof stock;
}

export const models: RootModel = { purchaseReceipts, stock};