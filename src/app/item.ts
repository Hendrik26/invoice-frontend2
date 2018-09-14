import {Invoice} from './invoice';

export class Item{


    id: number; // <th>Ändern</th>
    itemDate: string; /// <th>Leistungsdatum</th>
    itemName: string;  // <th>Leistungsbeschreibung</th>
    partialCost: number; // <th>Stückpreis</th>
    count: number; // <th>Anzahl</th>
    wholeCost: number; // <th>Gesamtpreis</th>
    hourPayment = false;
    currency = '€';

}

