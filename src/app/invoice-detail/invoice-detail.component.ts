import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {InvoiceService} from '../invoice.service';

// new imports added
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {InvoiceListComponent} from '../invoice-list/invoice-list.component';
import {Invoice} from '../invoice';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
    /* invoices: Invoice[];
    * items: Item[] = [

         {
             id: 1, itemDate: '2016-04-01', itemName: 'Programmieren',
             partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
         },
         {
             id: 2, itemDate: '2016-04-30', itemName: 'Datenbank-Design',
             partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
         }

     ]; */

    invoiceId: string;
    invoice: Invoice;
    nettoSum: number;
    percentageString: string;
    salesTax: number;
    bruttoSum: number;
    currency: string;

    // invoices: Invoice[];

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private invoiceService: InvoiceService
    ) {
    }

    ngOnInit() {
        this.receiveInvoiceId();
        // this.receiveInvoices();
        this.receiveInvoiceById(this.invoiceId);
        this.nettoSum = this.calculateNettoSum(this.invoiceId);
        this.percentageString = this.invoiceService.getSalesTaxPercentageString(this.invoiceId);
        this.salesTax = this.calculateSalesTax(this.invoiceId); // hier
        this.bruttoSum = this.calculateBruttoSum(this.invoiceId);
        this.invoice.wholeCost = this.bruttoSum;
        this.currency = this.invoice.currency;
    }

    /* receiveInvoices(): void {
        this.invoices = this.invoiceService.getInvoices();
    } */

    /* receiveInvoiceById(methId): void {
        this.invoice = this.invoiceService.getInvoiceById(methId);
    } */

    receiveInvoiceId():
        void {
        this.invoiceId = this.route.snapshot.paramMap.get('invoiceId');  // get invoiceID from URL
        // this.invoiceId = +this.route.snapshot.paramMap.get('invoiceId');  // + converts string to number
    }

  receiveInvoiceById(methId: string): void {
        this.invoiceService.getInvoiceObservableById(methId)
            .subscribe(invoice => this.invoice = invoice);
        // Empfängt Daten aus einem Datenstream, d.h. wenn sich invoice ändert übernimmt this.invoice die Daten von invoice
    }

  calculateNettoSum(methId: string): number {
        var methInvoice: Invoice;
        var methSum = 0;
        methInvoice = this.invoice;
        for (var i = 0; i < methInvoice.items.length; i++) {
            methSum += methInvoice.items[i].wholeCost;
        }
        return methSum;
    }

  calculateSalesTax(methId: string): number {
        var methInvoice: Invoice;
        methInvoice = this.invoice;
        return this.calculateNettoSum(methId) * methInvoice.salesTaxPercentage / 100;
    }

  calculateBruttoSum(methId: string): number {
        var methInvoice: Invoice;
        methInvoice = this.invoice;
        return this.calculateNettoSum(methId) + this.calculateSalesTax(methId);
    }

}
