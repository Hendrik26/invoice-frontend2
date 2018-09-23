import {Item} from './item';
import {InvoiceType} from './invoice-type';
import {ItemType} from './item-type';

export class Invoice implements InvoiceType {
    // //////////////////////
    private id: string; // <th>Ändern</th>
    invoiceDate: Date; // <th>Rechnungsdatum</th>
    invoiceNumber: string; // <th>RechnungsNr</th>
    recipient: string; // <th>Empfänger</th>
    invoiceState: string; // <th>Status (Entwurf, bezahlt, ...)</th>
    wholeCost: number; // <th>Gesamtpreis</th>
    countReminders: number; // <th>Anzahl der Mahnungen</th>
    timeSpan: string; // <th>Rechnungzeitraum</th>
    currency = '€';
    salesTaxPercentage: number;
    items: Item[];


    constructor(id: string, data: InvoiceType) {
        this.id = id;
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

    public addNewItem(item: ItemType): void {
        // TODO add new Item
        console.log("invoice.addNewItem");
        this.items.push(new Item(this, item));
        // return new Item(this, item);
    }

    public getID(): string {
        return this.id;
    }

    public getMaxItemId(): number {
        console.log("invoice.getMaxItemId")
        if (this.items === undefined) {
            return -1;
        } else {
            return this.items.reduce<number>((a: number, x: Item) => {
                return Math.max(a, x.getId());
            }, -1); // lambda-expression
        }
    }
}
