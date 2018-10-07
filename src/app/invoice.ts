import {Item} from './item';
import {InvoiceType} from './invoice-type';
import {ItemType} from './item-type';

export class Invoice implements InvoiceType {
    // //////////////////////
    // static properties
    private static emptyData: InvoiceType = {
        invoiceDate: new Date(),
        invoiceDueDate: new Date(),
        invoiceNumber: '2018axbycz',
        recipient: '',
        invoiceState: 'Entwurf',
        wholeCost: 0,
        countReminders: 0,
        timeSpan: 'unknown',
        salesTaxPercentage: 19
    };

    // IDs
    private id: string; // <th>Ändern</th>

    // other properties
    countReminders: number; // <th>Anzahl der Mahnungen</th>
    currency = '€';
    invoiceDate: Date; // <th>Rechnungsdatum</th>
    invoiceDueDate: Date; // Faelligkeitsdatum
    invoiceNumber: string; // <th>RechnungsNr</th>
    invoiceIntendedUse; // Verwendungszweck
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
        this.invoiceDueDate = data.invoiceDueDate;
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

    // static methods
    public static createNewInvoiceId(): string {
        const methDate: Date = new Date();
        return 'Inv' + methDate.getTime();
    }

    public static createNewInvoice(): Invoice { // factory pattern, prime example
        let methInvoice: Invoice;
        methInvoice = new Invoice(this.createNewInvoiceId(), this.emptyData);
        return methInvoice;
    }

    public static firstLine(inString: string): string {
        const lines = inString.split('\n');
        return lines[0];
    }

    public static companyNames(invoices: Invoice[]): string[] {
        let companyNameList: string[] = [];
        invoices.forEach(function (value) {
            companyNameList.push(value.companyName());
        });
        return companyNameList;
    }


    public companyName(): string {
        return Invoice.firstLine(this.recipient);
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
