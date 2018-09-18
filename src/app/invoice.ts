import {Item} from './item';

export class Invoice {
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
}
