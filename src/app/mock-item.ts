import { Item } from './item';

export const ITEMS: Item[] = [
     // item-information added

        new Item(1,{
             itemDate: '2016-04-01', itemName: 'Programmieren',
            partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
        }),
        new Item(2, {
             itemDate: '2016-04-30', itemName: 'Datenbank-Design',
            partialCost: 60.00, count: 5, hourPayment: false, currency: '€'
        })

    ];
