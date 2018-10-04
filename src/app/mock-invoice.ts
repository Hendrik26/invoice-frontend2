import {Invoice} from './invoice';
import {Item} from './item';

let invoice01 = new Invoice('In001', {
  invoiceDate: new Date('2016-02-04'), invoiceNumber: '2018abcd', recipient: 'DumpfbackeGmbH',
  invoiceDueDate: new Date('2016-02-24'),,
  invoiceState: 'Entwurf', wholeCost: 1111.11, countReminders: 0, timeSpan: '2017-01-01 bis 2017-12-31',
  currency: '€', salesTaxPercentage: 19
});
invoice01.addNewItem({
  itemDate: '2016-04-01', itemName: 'Programmieren',
  partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
});
invoice01.addNewItem({
  itemDate: '2016-04-30', itemName: 'Datenbank-Design',
  partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
});


let invoice02 = new Invoice('In002', {
  invoiceDate: new Date('2016-04-01'), invoiceNumber: '2018efgh', recipient: 'Goldbroiler',
  invoiceDate: new Date('2016-02-21'),
  invoiceState: 'Entwurf', wholeCost: 2222.221, countReminders: 0, timeSpan: '2016-01-01 bis 2016-12-31',
  currency: '€', salesTaxPercentage: 19
});

invoice02.addNewItem({
  itemDate: '2016-04-01', itemName: 'Programmieren',
  partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
});
invoice02.addNewItem({
  itemDate: '2016-04-30', itemName: 'Datenbank-Design',
  partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
});

let invoice03 = new Invoice('In003', {
  invoiceDate: new Date('2016-02-06'), invoiceNumber: '2018ijkl', recipient: 'Schweizer Käse&Socken GmbH',
  invoiceDueDate: new Date('2016-03-04'),
  invoiceState: 'Entwurf', wholeCost: 333.3321, countReminders: 0, timeSpan: '2015-01-01 bis 2015-12-31',
  currency: '€', salesTaxPercentage: 19
});

invoice03.addNewItem({
  itemDate: '2016-04-01', itemName: 'Programmieren',
  partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
});
invoice03.addNewItem({
  itemDate: '2016-04-30', itemName: 'Datenbank-Design',
  partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
});

export const INVOICES: Invoice[] = [invoice01, invoice02, invoice03];
