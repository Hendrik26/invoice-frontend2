import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {Item} from '../item';
import {InvoiceService} from '../invoice.service';
import {InvoiceType} from '../invoice-type';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  standardItem: Item = {
    id: -1, count: 1, currency: '€', hourPayment: false, itemDate: '03. Oktober 1990',
    itemName: 'Treiberprogrammierung', partialCost: 30, wholeCost: 10
  };

  standardInvoice: InvoiceType = {
    invoiceDate: new Date('04. Februar 2016'),
    invoiceNumber: '2018abcd',
    recipient: 'DusselGmbH',
    invoiceState: 'Entwurf',
    wholeCost: 1111.11,
    countReminders: 0,
    timeSpan: '2017-01-01 bis 2017-12-31',
    salesTaxPercentage: 19,
    items: [{...this.standardItem}]
  };

  // invoicesNew: Invoice[] = [{...this.standardInvoice}]; // clones this.standardInvoice


   invoicesNew: Invoice[] = [new Invoice('In001', this.standardInvoice)]; // clones this.standardInvoice

  invoices: Invoice[];

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.receiveInvoices();
  }

  /* receiveInvoices(): void {
      this.invoices = this.invoiceService.getInvoices();
  } */

  receiveInvoices(): void {
    this.invoiceService.getInvoices()
      .subscribe(invoices => this.invoices = invoices);
  }

}
