import {Customer} from './customer';

let customer1 = new Customer('Cus0001', {customerNumber: 'Schweizer KS', customerName: 'Schweizer Käse&Socken GmbH', country: 'Schweiz',postalCode: 'CH-0815',
    city: 'Bern', addressLine1: 'Almweg 88', addressLine2: '', addressLine3: '', customerSalesTaxNumber: '7-40-11', creationTime: new Date('2017-04-01')});

let customer2 = new Customer('Cus002', {customerNumber: 'Dumpfbacken', customerName: 'DumpfbackenGmbH', country: 'DDR', postalCode: 'D-6969',
    city: 'Sömmerda', addressLine1: 'Waldweg 11', addressLine2: 'OT Tunzenhausen', addressLine3: '', customerSalesTaxNumber: '0-08-15', creationTime: new Date('2018-11-11')});

let customer3 = new Customer('Cus003', {customerNumber: 'Olsen', customerName: 'Olsenbande', country: 'Daenemark', postalCode: 'DK-2050',
    city: 'Kopenhagen', addressLine1: 'Asta Nielsen Strædet 13', addressLine2: 'OT Valby', addressLine3: '', customerSalesTaxNumber: '1-23-45', creationTime: new Date('1998-12-18')});

export const CUSTOMERS: Customer[] =  [customer1, customer2, customer3];

