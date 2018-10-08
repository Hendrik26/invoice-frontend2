import {Invoice} from './invoice';
import {ItemType} from './item-type';

export class Item implements ItemType {

  //region IDs
  private itemId: number; // <th>Ändern</th>
  private invoiceId: string;
  //endregion


  //region other properties
  itemDate: string; /// <th>Leistungsdatum</th>
  itemName: string;  // <th>Leistungsbeschreibung</th>
  partialCost: number; // <th>Stückpreis</th>
  count: number; // <th>Anzahl</th>
  wholeCost: number; // <th>Gesamtpreis</th>
  hourPayment = false;
  currency = '€';
  //endregion


  public constructor(invoice: Invoice, data: ItemType) {
    this.itemId = invoice.computeNextItemId(); // item needs itemId and invoiceId to be unique.
    this.invoiceId = invoice.getID(); // item needs itemId and invoiceId to be unique.
    this.itemDate = data.itemDate;
    this.itemName = data.itemName;
    this.partialCost = data.partialCost;
    this.count = data.count;
    this.wholeCost = data.count * data.partialCost;
    this.hourPayment = data.hourPayment;
    this.currency = data.currency || '€';
  }


  //region getter
  public getData(): ItemType {
    let data: ItemType;
    data = {
      itemDate: this.itemDate,
      itemName: this.itemName,
      partialCost: this.partialCost,
      count: this.count,
      hourPayment: this.hourPayment,
      currency: this.currency
    };
    return data;
  }

  public getItemId(): number {
    return this.itemId;
  }

  public getInvoiceId(): string {
    return this.invoiceId;
  }
  //endregion

  // other methods


}

