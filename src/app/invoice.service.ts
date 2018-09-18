import {Injectable} from '@angular/core';
import {Invoice} from './invoice';
import {INVOICES} from './mock-invoice';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    id: number;

    constructor() {
    }

    getInvoices(): Invoice[] { // Returns the whole array of all Invoices
        return INVOICES;
    }

    getInvoiceById(methId: number): Invoice {
        var methInvoice: Invoice;
        for (var i = 0; i < INVOICES.length; i++) {
            if (INVOICES[i].id == methId) {
                methInvoice = INVOICES[i];
            }
        }
        return methInvoice;
    }
}
