import {Invoice} from './invoice';

export const INVOICES: Invoice[] = [

  new Invoice('In001', {
    invoiceDate: new Date('04. February 2016'), invoiceNumber: '2018abcd', recipient: 'DusselGmbH',
    invoiceState: 'Entwurf', wholeCost: 1111.11, countReminders: 0, timeSpan: '2017-01-01 bis 2017-12-31',
    currency: '€', salesTaxPercentage: 19,
    items: [ // item-information added

      {
        id: 1, itemDate: '2016-04-01', itemName: 'Programmieren',
        partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
      },
      {
        id: 2, itemDate: '2016-04-30', itemName: 'Datenbank-Design',
        partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
      }

    ]
  }),
  new Invoice('In002', {
    invoiceDate: new Date('05. February 2016'), invoiceNumber: '2018efgh', recipient: 'PlatinHuhn',
    invoiceState: 'Entwurf', wholeCost: 2222.221, countReminders: 0, timeSpan: '2016-01-01 bis 2016-12-31',
    currency: '€', salesTaxPercentage: 19,
    items: [ // item-information added

      {
        id: 1, itemDate: '2016-04-01', itemName: 'Programmieren',
        partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
      },
      {
        id: 2, itemDate: '2016-04-30', itemName: 'Datenbank-Design',
        partialCost: 60.00, count: 5, wholeCost: 500, hourPayment: false, currency: '€'
      }

    ]
  }),
  new Invoice('In003', {
    invoiceDate: new Date('06. February 2016'), invoiceNumber: '2018ijkl', recipient: 'Schweizer Käse&Socken GmbH',
    invoiceState: 'Entwurf', wholeCost: 333.3321, countReminders: 0, timeSpan: '2015-01-01 bis 2015-12-31',
    currency: '€', salesTaxPercentage: 19,
    items: [ // item-information added

      {
        id: 1, itemDate: '2016-04-01', itemName: 'Programmieren',
        partialCost: 60.00, count: 5, wholeCost: 700, hourPayment: false, currency: '€'
      },
      {
        id: 2, itemDate: '2016-04-30', itemName: 'Datenbank-Design',
        partialCost: 60.00, count: 5, wholeCost: 900, hourPayment: false, currency: '€'
      }

    ]
  })
];
