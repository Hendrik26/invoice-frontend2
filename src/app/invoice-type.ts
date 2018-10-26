export interface InvoiceType {
  invoiceDate: Date;
  invoiceDueDate: Date; // Faelligkeitsdatum
  invoiceIntendedUse: string;
  invoiceNumber: string;
  recipient: string;
  invoiceState: string;
  wholeCost: number;
  countReminders: number;
  timeSpan: string;
  currency?: string; // Fragezeichen ? heisst optional
  salesTaxPercentage: number;
}
