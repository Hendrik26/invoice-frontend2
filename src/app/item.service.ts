import { Injectable } from '@angular/core';
import {Invoice} from './invoice';

import {Item} from './item';
import {INVOICES} from './mock-invoice';
import {forEach} from '@angular/router/src/utils/collection';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

    itemId: number;
    ivoiceId: number;

  constructor() { }

    getItemsByInvoiceId(methInvoiceId: number): Observable<Item[]> {
        var methInvoice: Invoice;
        for (var i = 0; i < INVOICES.length; i++) {
            if (INVOICES[i].id == methInvoiceId) {
                methInvoice = INVOICES[i];
            }
        }
        return of(methInvoice.items);
    }

    getItemByItemId(methInvoiceId: number, methItemId: number): Observable<Item> {
        var methInvoice: Invoice;
        var methItem: Item;
        for (var i = 0; i < INVOICES.length; i++) { // identifies the correct invpice
            if (INVOICES[i].id == methInvoiceId) {
                methInvoice = INVOICES[i];
            }
        }
        for (var i = 0; i < methInvoice.items.length; i++) { // identifies the correct item
            if (methInvoice.items[i].id == methItemId) {
                methItem = methInvoice.items[i];
            }
        }
        return of(methItem);
    }

}
