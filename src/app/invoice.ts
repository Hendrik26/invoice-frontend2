import {Item} from './item';
import {InvoiceType} from './invoice-type';
import {ItemType} from './item-type';

export class Invoice implements InvoiceType {
    // //////////////////////
    // IDs
    private id: string; // <th>Ändern</th>

    // other properties
    countReminders: number; // <th>Anzahl der Mahnungen</th>
    currency = '€';
    invoiceDate: Date; // <th>Rechnungsdatum</th>
    invoiceNumber: string; // <th>RechnungsNr</th>
    invoiceState: string; // <th>Status (Entwurf, bezahlt, ...)</th>
    items: Item[];
    recipient: string; // <th>Empfänger</th>
    salesTaxPercentage: number;
    timeSpan: string; // <th>Rechnungzeitraum</th>
    wholeCost: number; // <th>Gesamtpreis</th>


    constructor(id: string, data: InvoiceType) {
        // IDs
        this.id = id; // New Commit after problems with merging

        // other properties
        this.invoiceDate = data.invoiceDate;
        this.invoiceNumber = data.invoiceNumber;
        this.recipient = data.recipient;
        this.invoiceState = data.invoiceState;
        this.wholeCost = data.wholeCost;
        this.countReminders = data.countReminders;
        this.timeSpan = data.timeSpan;
        this.currency = data.currency || '€';
        this.salesTaxPercentage = data.salesTaxPercentage;
        this.items = [];
    }

    // getter
    public getID(): string {
        return this.id;
    }

    private getMaxItemId(): number {
        console.log('invoice.getMaxItemId');
        if (this.items === undefined) {
            return -1;
        } else {
            return this.items.reduce<number>((a: number, x: Item) => {
                return Math.max(a, x.getItemId());
            }, -1); // lambda-expression
        }
    }

    // setter

    // otherr methods
    public addNewItem(itemType: ItemType): number {
        // TODO add new Item
        console.log('invoice.addNewItem');
        const createdItem = new Item(this, itemType);
        this.items.push(createdItem);
        // return new Item(this, item);
        return createdItem.getItemId();
    }

    public computeNextItemId(): number {
        return this.getMaxItemId() + 1;
    }
}
