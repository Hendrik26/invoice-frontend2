import {Injectable} from '@angular/core';
import {Invoice} from './invoice';
import {INVOICES} from './mock-invoice';
import {Observable, of} from 'rxjs';
import {ItemType} from './item-type';
import {InvoiceType} from './invoice-type';
import {Item} from './item';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    id: number;
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


    constructor() {
    }

    /* getInvoices(): Invoice[] { // Returns the whole array of all Invoices
        return INVOICES;
    } */


    // getter
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
        var methInvoice: Invoice;
        for (var i = 0; i < INVOICES.length; i++) {
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

    // setter

    // other methods
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

    saveInvoiceGlobalsByInvoiceId(methInvoiceId: string, countReminders: number, currency: string,
                                  invoiceDate: Date, invoiceDueDate: Date, invoiceNumber: string, invoiceState: string, recipient: string,
                                  salesTaxPercentage: number, timeSpan: string, wholeCost: number): void {
        let methInvoice: Invoice;
      console.log('invoice.service.ts: method saveInvoiceGlobalsByInvoiceId((...){...}');
        for (let i = 0; i < INVOICES.length; i++) { // identifies the correct invpice
            if (INVOICES[i].getID() === methInvoiceId) {
                methInvoice = INVOICES[i];
            }
        }

        methInvoice.countReminders = countReminders;
        methInvoice.currency = currency;
        this.currency = methInvoice.currency;
        console.log('invoice.service.currency: ' + this.currency);
        methInvoice.invoiceDate = invoiceDate;
        methInvoice.invoiceDueDate = invoiceDueDate;
        methInvoice.invoiceNumber = invoiceNumber;
        methInvoice.invoiceState = invoiceState;
        methInvoice.recipient = recipient;
        methInvoice.salesTaxPercentage = salesTaxPercentage;
        methInvoice.timeSpan = timeSpan;
        methInvoice.wholeCost = wholeCost;
    }

  saveNewInvoice(countReminders: number, currency: string,
                                invoiceDate: Date, invoiceDueDate: Date, invoiceNumber: string, invoiceState: string, recipient: string,
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
    methInvoice.recipient = recipient;
    methInvoice.salesTaxPercentage = salesTaxPercentage;
    methInvoice.timeSpan = timeSpan;
    methInvoice.wholeCost = wholeCost;
    INVOICES.push(methInvoice);
  }


  createNewInvoiceId() {
    let invoice: Invoice;
    invoice = Invoice.createNewInvoice();
    INVOICES.push(invoice);
    return invoice.getID();
  }
}
