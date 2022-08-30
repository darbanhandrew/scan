import { PurchaseReceipt } from "./PurchaseReceipt.type";
import { PurchaseReceiptItem } from "./PurchaseReceiptItem.type";

// Converts JSON strings to/from your types
export class Convert {
	public static toPurchaseReceiptItem(json: string): PurchaseReceiptItem {
		return JSON.parse(json);
	}

	public static purchaseReceiptItemToJson(value: PurchaseReceiptItem): string {
		return JSON.stringify(value);
	}

	public static toPurchaseReceipt(json: string): PurchaseReceipt {
		return JSON.parse(json);
	}

	public static purchaseReceiptToJson(value: PurchaseReceipt): string {
		return JSON.stringify(value);
	}
}
