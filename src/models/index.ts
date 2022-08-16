import { Models } from '@rematch/core';
import { purchaseReceipts } from './PurchaseReceipts';


export interface RootModel extends Models<RootModel> {
		purchaseReceipts: typeof purchaseReceipts;
}

export const models: RootModel = { purchaseReceipts, };