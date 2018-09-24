import {Invoice} from './invoice';
import {InvoiceType} from './invoice-type';
import {ItemType} from './item-type';

export class Item implements ItemType{


    private itemId: number; // <th>Ändern</th>
    private invoiceId: string;
    itemDate: string; /// <th>Leistungsdatum</th>
    itemName: string;  // <th>Leistungsbeschreibung</th>
    partialCost: number; // <th>Stückpreis</th>
    count: number; // <th>Anzahl</th>
    wholeCost: number; // <th>Gesamtpreis</th>
    hourPayment = false;
    currency = '€';


  constructor(invoice: Invoice, data: ItemType) {
    // TODO replace method invoice.getMaxItermId by invoice.computeNextItemId
    this.itemId = invoice.getMaxItemId() + 1; // item needs itemId and invoiceId to be unique.
    this.invoiceId = invoice.getID(); // item needs itemId and invoiceId to be unique.
    this.itemDate = data.itemDate;
    this.itemName = data.itemName;
    this.partialCost = data.partialCost;
    this.count = data.count;
    this.wholeCost = data.count * data.partialCost;
    this.hourPayment = data.hourPayment;
    this.currency = data.currency || '€';
  }


  getId(): number {
      return this.itemId;
    }

}

