import {Injectable} from '@angular/core';
import {Invoice} from './invoice';
import {INVOICES} from './mock-invoice';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor() {
    }

    getInvoices(): Invoice[] { // Returns the whole array of all Invoices
        return INVOICES;
    }
}
