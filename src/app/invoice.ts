import {Item} from './item';
import {InvoiceType} from './invoice-type';
import {ItemType} from './item-type';

export class Invoice implements InvoiceType {
    // //////////////////////


    //region static properties
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
    //endregion
    //region other properties
    countReminders: number; // <th>Anzahl der Mahnungen</th>
    //endregion
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
    //region IDs
    private id: string; // <th>Ändern</th>
    //endregion

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


    //region static methods
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

    public static compareInvoicesByCompanyName(invoice01: Invoice, invoice02: Invoice): number {
        console.log('Method compareInvoicesByCompanyName(...){...}');
        if (invoice01.companyName().trim().toLowerCase() < invoice02.companyName().trim().toLowerCase()) {
            return -1;
        }
        return 1;
    }

    public static sortInvoices(sortBy: string, ascending: boolean, invoices: Invoice[]): Invoice[] {
        // sortBy: Groesse, nach der sortiert werden soll
        console.log('Sorting invoices by ' + sortBy);
        let ascendingFactor = -1;
        if (ascending) {
            ascendingFactor = +1;
        }

        if (sortBy == 'Date') {
            invoices.sort(function (a, b) {
                return ascendingFactor * a.invoiceDate.getTime() - ascendingFactor * b.invoiceDate.getTime();
            });
        }

        if (sortBy == 'DueDate') {
            invoices.sort(function (a, b) {
                return ascendingFactor * a.invoiceDueDate.getTime() - ascendingFactor * b.invoiceDueDate.getTime();
            });
        }

        if (sortBy == 'CompanyName') {
            invoices.sort(function (a, b) {
                return ascendingFactor * Invoice.compareInvoicesByCompanyName(a, b);
            });
        }
        return invoices;
    }



    //endregion


    //region getter
    public getID(): string {
        return this.id;
    }

    //region other methods
    public addNewItem(itemType: ItemType): number {
        // TODO add new Item
        console.log('invoice.addNewItem');
        const createdItem = new Item(this, itemType);
        this.items.push(createdItem);
        // return new Item(this, item);
        return createdItem.getItemId();
    }

    //endregion

    // setter


    public companyName(): string {
        return Invoice.firstLine(this.recipient);
    }

    public computeNextItemId(): number {
        return this.getMaxItemId() + 1;
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

    //endregion



}
