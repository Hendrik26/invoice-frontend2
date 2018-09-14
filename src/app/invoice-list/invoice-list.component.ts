import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {Item} from '../item';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  standardItem: Item = {id: -1, count: 1, currency: '€', hourPayment: false, itemDate: '03. Oktober 1990',
    itemName: 'Treiberprogrammierung', partialCost: 30, wholeCost: 10};

  standardInvoice: Invoice = {
    id: 1, invoiceDate: new Date('04. Februar 2016'), invoiceNumber: '2018abcd', recipient: 'DusselGmbH',
    invoiceState: 'Entwurf', wholeCost: 1111.11, countReminders: 0, timeSpan: '2017-01-01 bis 2017-12-31',
    currency: '€', items: [{...this.standardItem}]
  };

  invoices: Invoice[] = [

    {
      id: 1, invoiceDate: new Date('04. February 2016'), invoiceNumber: '2018abcd', recipient: 'DusselGmbH',
      invoiceState: 'Entwurf', wholeCost: 1111.11, countReminders: 0, timeSpan: '2017-01-01 bis 2017-12-31', currency: '€'
    },
    {
      id: 2, invoiceDate: new Date('05. February 2016'), invoiceNumber: '2018efgh', recipient: 'PlatinHuhn',
      invoiceState: 'Entwurf', wholeCost: 2222.221, countReminders: 0, timeSpan: '2016-01-01 bis 2016-12-31', currency: '€'
    },
    {
      id: 3, invoiceDate: new Date('06. February 2016'), invoiceNumber: '2018ijkl', recipient: 'Schweizer Käse&Socken GmbH',
      invoiceState: 'Entwurf', wholeCost: 333.3321, countReminders: 0, timeSpan: '2015-01-01 bis 2015-12-31', currency: '€'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
