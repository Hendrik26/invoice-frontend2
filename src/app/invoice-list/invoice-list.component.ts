import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {Item} from '../item';
import {InvoiceService} from '../invoice.service';
import {InvoiceType} from '../invoice-type';
import {ItemType} from '../item-type';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {


   // invoicesNew: Invoice[] = [{...this.invoiceService.standardInvoice}]; // clones this.standardInvoice


   //invoicesNew: Invoice[] = [new Invoice('In001', this.)]; // clones this.standardInvoice

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
