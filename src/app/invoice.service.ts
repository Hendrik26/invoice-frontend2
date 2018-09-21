import {Injectable} from '@angular/core';
import {Invoice} from './invoice';
import {INVOICES} from './mock-invoice';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  id: number;

  constructor() {
  }

  /* getInvoices(): Invoice[] { // Returns the whole array of all Invoices
      return INVOICES;
  } */

  getInvoices(): Observable<Invoice[]> {
    return of(INVOICES);
  }

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

  calculateBruttoSum(methId: string): number {
    var methInvoice: Invoice;
    methInvoice = this.getInvoiceById(methId);
    return this.calculateNettoSum(methId) + this.calculateSalesTax(methId);
  }

  getSalesTaxPercentage(methId: string): number {
    var methInvoice: Invoice;
    methInvoice = this.getInvoiceById(methId);
    return methInvoice.salesTaxPercentage;
  }

  getSalesTaxPercentageString(methId: string): string {
    var methInvoice: Invoice;
    methInvoice = this.getInvoiceById(methId);
    return methInvoice.salesTaxPercentage + 'Prozent';
  }
}
