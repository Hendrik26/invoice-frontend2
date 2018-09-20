import {Item} from './item';
import {InvoiceType} from './invoice-type';

export class Invoice implements InvoiceType {
  // //////////////////////
  id: number; // <th>Ändern</th>
  invoiceDate: Date; // <th>Rechnungsdatum</th>
  invoiceNumber: string; // <th>RechnungsNr</th>
  recipient: string; // <th>Empfänger</th>
  invoiceState: string; // <th>Status (Entwurf, bezahlt, ...)</th>
  wholeCost: number; // <th>Gesamtpreis</th>
  countReminders: number; // <th>Anzahl der Mahnungen</th>
  timeSpan: string; // <th>Rechnungzeitraum</th>
  currency = '€';
  salesTaxPercentage: number;
  items: Item[];


  constructor(data: InvoiceType) {
    this.id = data.id;
    this.invoiceDate = data.invoiceDate;
    this.invoiceNumber = data.invoiceNumber;
    this.recipient = data.recipient;
    this.invoiceState = data.invoiceState;
    this.wholeCost = data.wholeCost;
    this.countReminders = data.countReminders;
    this.timeSpan = data.timeSpan;
    this.currency = data.currency || '€';
    this.salesTaxPercentage = data.salesTaxPercentage;
    this.items = data.items;
  }

  public getID(): number {
    return this.id;
  }
}
