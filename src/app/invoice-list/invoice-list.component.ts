import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {InvoiceService} from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {


   // invoicesNew: Invoice[] = [{...this.invoiceService.standardInvoice}]; // clones this.standardInvoice


   // invoicesNew: Invoice[] = [new Invoice('In001', this.)]; // clones this.standardInvoice

  invoices: Invoice[];
  filterStartDate: Date;
  filterEndDate: Date;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.receiveInvoices();
    /* if (this.invoices.length < 1) {
      this.invoices.push(new Invoice('Inn1', this.invoiceService.standardInvoice))
    } */
  }

  filter(invoices: Invoice[]): Invoice[]{
      // TODO filter
    return invoices
      .filter(invoice => invoice.invoiceDate.getTime() >= this.filterStartDate.getTime())
      .filter(invoice => invoice.invoiceDate.getTime() <= this.filterEndDate.getTime())
      ;
  }

  receiveInvoices(): void {
    this.invoiceService.getInvoices()
      .subscribe(invoices => this.invoices = invoices);
  }

}
