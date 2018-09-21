import {Invoice} from './invoice';
import {InvoiceType} from './invoice-type';
import {ItemType} from './item-type';

export class Item implements ItemType{


    private id: number; // <th>Ändern</th>
    itemDate: string; /// <th>Leistungsdatum</th>
    itemName: string;  // <th>Leistungsbeschreibung</th>
    partialCost: number; // <th>Stückpreis</th>
    count: number; // <th>Anzahl</th>
    wholeCost: number; // <th>Gesamtpreis</th>
    hourPayment = false;
    currency = '€';


  constructor(id: number, data: ItemType) {
    this.id = id;
    this.itemDate = data.itemDate;
    this.itemName = data.itemName;
    this.partialCost = data.partialCost;
    this.count = data.count;
    this.wholeCost = data.count * data.partialCost;
    this.hourPayment = data.hourPayment;
    this.currency = data.currency || '€';
  }

  getId(): number {
      return this.id;
    }

}

