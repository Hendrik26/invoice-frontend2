import {Item} from './item';

export interface InvoiceType {
  id: number;
  invoiceDate: Date;
  invoiceNumber: string;
  recipient: string;
  invoiceState: string;
  wholeCost: number;
  countReminders: number;
  timeSpan: string;
  currency?: string; // Fragezeichen ? heisst optional
  salesTaxPercentage: number;
  items: Item[];
}
