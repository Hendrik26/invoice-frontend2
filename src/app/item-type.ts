export interface ItemType {
  itemDate: string; /// <th>Leistungsdatum</th>
  itemName: string;  // <th>Leistungsbeschreibung</th>
  partialCost: number; // <th>Stückpreis</th>
  count: number; // <th>Anzahl</th>
  hourPayment: boolean;
  currency: string;
}
