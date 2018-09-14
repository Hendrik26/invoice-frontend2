import {Component, OnInit} from '@angular/core';
import {Invoice002} from '../invoice002';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  hhInvoice: Invoice002 = {
    id: 1, invoiceDate: '04. Februar 2016', invoiceNumber: '2018abcd', recipient: 'DusselGmbH',
    invoiceState: 'Entwurf', wholeCost: 1111.11, countReminders: 0, timeSpan: '2017-01-01 bis 2017-12-31', currency: '€'
  };

  invoices: Invoice002[] = [

    {
      id: 1, invoiceDate: '04. February 2016', invoiceNumber: '2018abcd', recipient: 'DusselGmbH',
      invoiceState: 'Entwurf', wholeCost: 1111.11, countReminders: 0, timeSpan: '2017-01-01 bis 2017-12-31', currency: '€'
    },
    {
      id: 2, invoiceDate: '05. February 2016', invoiceNumber: '2018efgh', recipient: 'PlatinHuhn',
      invoiceState: 'Entwurf', wholeCost: 2222.221, countReminders: 0, timeSpan: '2016-01-01 bis 2016-12-31', currency: '€'
    },
    {
      id: 3, invoiceDate: '06. February 2016', invoiceNumber: '2018ijkl', recipient: 'Schweizer Käse&Socken GmbH',
      invoiceState: 'Entwurf', wholeCost: 333.3321, countReminders: 0, timeSpan: '2015-01-01 bis 2015-12-31', currency: '€'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
