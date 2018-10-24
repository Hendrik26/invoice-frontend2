import {Injectable} from '@angular/core';
import {Invoice} from './invoice';
import {INVOICES} from './mock-invoice';
import {Observable, of} from 'rxjs';
import {ItemType} from './item-type';
import {InvoiceType} from './invoice-type';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {


    //region IDs
    id: number;
    //endregion


    //region other properties
    currency: string; // for test-Cases

    standardItem: ItemType = {
        count: 1, currency: '€', hourPayment: false, itemDate: '03. Oktober 1990',
        itemName: 'Treiberprogrammierung', partialCost: 30
    };

    standardInvoice: InvoiceType = {
        invoiceDate: new Date('04. Februar 2016'),
        invoiceDueDate: new Date('24. Februar 2016'),
        invoiceNumber: '2018abcd',
        recipient: 'DusselGmbH',
        invoiceState: 'Entwurf',
        wholeCost: 1111.11,
        countReminders: 0,
        timeSpan: '2017-01-01 bis 2017-12-31',
        salesTaxPercentage: 19
    };

    //endregion


    constructor() {
    }

    /* getInvoices(): Invoice[] { // Returns the whole array of all Invoices
        return INVOICES;
    } */


    //region getter
    getInvoiceById(methId: string): Invoice {
        var methInvoice: Invoice;
        for (var i = 0; i < INVOICES.length; i++) {
            if (INVOICES[i].getID() === methId) {
                methInvoice = INVOICES[i];
            }
        }
        return methInvoice;
    }

    getInvoiceObservableById(methId: string): Observable<Invoice> {
        let methInvoice: Invoice;
        for (let i = 0; i < INVOICES.length; i++) {
            if (INVOICES[i].getID() === methId) {
                methInvoice = INVOICES[i];
            }
        }
        return of(methInvoice);
    }

    getInvoices(): Observable<Invoice[]> {
        return of(INVOICES);
    }

    getSalesTaxPercentage(methId: string): number {
        var methInvoice: Invoice;
        methInvoice = this.getInvoiceById(methId);
        return methInvoice.salesTaxPercentage;
    }

    getSalesTaxPercentageString(methId: string): string {
        var methInvoice: Invoice;
        methInvoice = this.getInvoiceById(methId);
        return methInvoice.salesTaxPercentage + '%';
    }

    //endregion

    // setter


    //region other methods
    calculateBruttoSum(methId: string): number {
        var methInvoice: Invoice;
        methInvoice = this.getInvoiceById(methId);
        return this.calculateNettoSum(methId) + this.calculateSalesTax(methId);
    }

    calculateNettoSum(methId: string): number {
        var methInvoice: Invoice;
        var methSum = 0;
        methInvoice = this.getInvoiceById(methId);
        for (var i = 0; i < methInvoice.items.length; i++) {
            methSum += methInvoice.items[i].wholeCost;
        }
        return methSum;
    }

    calculateSalesTax(methId: string): number {
        var methInvoice: Invoice;
        methInvoice = this.getInvoiceById(methId);
        return this.calculateNettoSum(methId) * methInvoice.salesTaxPercentage / 100;
    }

    createNewInvoiceId() {
        let invoice: Invoice;
        invoice = Invoice.createNewInvoice();
        INVOICES.push(invoice);
        return invoice.getID();
    }


    saveInvoiceGlobalsByInvoiceId(methInvoiceId: string, countReminders: number, currency: string,
                                  invoiceDate: Date, invoiceDueDate: Date, invoiceNumber: string,
                                  invoiceIntendedUse: string,
                                  invoiceState: string, recipient: string,
                                  salesTaxPercentage: number, timeSpan: string, wholeCost: number): void {
        let methInvoice: Invoice;
        console.log('invoice.service.ts: method saveInvoiceGlobalsByInvoiceId((...){...}');
        for (let i = 0; i < INVOICES.length; i++) { // identifies the correct invpice
            if (INVOICES[i].getID() === methInvoiceId) {
                methInvoice = INVOICES[i];
            }
        }

        methInvoice.newCreatedInvoice = false;
        methInvoice.countReminders = countReminders;
        methInvoice.currency = currency;
        this.currency = methInvoice.currency;
        methInvoice.invoiceDate = invoiceDate;
        methInvoice.invoiceDueDate = invoiceDueDate;
        methInvoice.invoiceNumber = invoiceNumber;
        methInvoice.invoiceIntendedUse = invoiceIntendedUse;
        methInvoice.invoiceState = invoiceState;
        methInvoice.recipient = recipient;
        methInvoice.salesTaxPercentage = salesTaxPercentage;
        methInvoice.timeSpan = timeSpan;
        methInvoice.wholeCost = wholeCost;
    }

    saveNewInvoice(countReminders: number, currency: string, // can probably be deleted
                   invoiceDate: Date, invoiceDueDate: Date, invoiceNumber: string,
                   invoiceIntendedUse: string,
                   invoiceState: string, recipient: string,
                   salesTaxPercentage: number, timeSpan: string, wholeCost: number): void {
        let methInvoice: Invoice;
        methInvoice = Invoice.createNewInvoice();

        methInvoice.countReminders = countReminders;
        methInvoice.currency = currency;
        this.currency = methInvoice.currency;
        console.log('invoice.service.currency: ' + this.currency);
        methInvoice.invoiceDate = invoiceDate;
        methInvoice.invoiceDueDate = invoiceDueDate;
        methInvoice.invoiceNumber = invoiceNumber;
        methInvoice.invoiceState = invoiceState;
        methInvoice.invoiceIntendedUse = invoiceIntendedUse;
        methInvoice.recipient = recipient;
        methInvoice.salesTaxPercentage = salesTaxPercentage;
        methInvoice.timeSpan = timeSpan;
        methInvoice.wholeCost = wholeCost;
        this.removeLastInvoice();
        INVOICES.push(methInvoice);
    }

    public removeLastInvoice(): void {
        INVOICES.pop();
    }


    //endregion
}
