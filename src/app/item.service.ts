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



  constructor() { }

  getItemsByInvoiceId(methInvoiceId: string): Observable<Item[]> {
        let methInvoice: Invoice;
        for (let i = 0; i < INVOICES.length; i++) {
            if (INVOICES[i].getID() == methInvoiceId) {
                methInvoice = INVOICES[i];
            }
        }
        return of(methInvoice.items);
    }

  getItemByItemId(methInvoiceId: string, methItemId: number): Observable<Item> {
        let methInvoice: Invoice;
        let methItem: Item;
        for (let i = 0; i < INVOICES.length; i++) { // identifies the correct invpice
            if (INVOICES[i].getID() == methInvoiceId) {
                methInvoice = INVOICES[i];
            }
        }
        for (let i = 0; i < methInvoice.items.length; i++) { // identifies the correct item
            if (methInvoice.items[i].id == methItemId) {
                methItem = methInvoice.items[i];
            }
        }
        return of(methItem);
    }

  saveItemByIds(methInvoiceId: string, methItemId: number, count: number, currency: string,
                hourPayment: boolean, itemDate: string, itemName: string, partialCost: number): void {
      let methInvoice: Invoice;
      let methItem: Item;
      for (let i = 0; i < INVOICES.length; i++) { // identifies the correct invpice
        if (INVOICES[i].getID() == methInvoiceId) {
          methInvoice = INVOICES[i];
        }
      }
      for (let i = 0; i < methInvoice.items.length; i++) { // identifies the correct item
        if (methInvoice.items[i].id == methItemId) {
          methItem = methInvoice.items[i];
        }
      }
      methItem.count = count;
      methItem.currency = currency;
      methItem.hourPayment = hourPayment;
      methItem.itemDate = itemDate;
      methItem.itemName = itemName
      methItem.partialCost = partialCost;
      methItem.wholeCost = count * partialCost;
    }

}
