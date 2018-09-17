import {Component, OnInit} from '@angular/core';
import {Item} from '../item';

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
    invoices: Invoice[];
    /* items: Item[] = [

        {
            id: 1, itemDate: '2016-04-01', itemName: 'Programmieren',
            partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
        },
        {
            id: 2, itemDate: '2016-04-30', itemName: 'Datenbank-Design',
            partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
        }

    ]; */

    invoiceId: number;


    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private invoiceListComponent: InvoiceListComponent // import of invoice-list
    ) {
    }

    ngOnInit() {
        this.receiveInvoiceId();
        this.receiveInvoices();
    }

    receiveInvoiceId(): void {
        this.invoiceId = +this.route.snapshot.paramMap.get('invoiceId');  // get invoiceID from URL
    }

    receiveInvoices(): void {
        this.invoices = this.invoiceListComponent.invoices; // Is this OK???
    }

    openItemDetail(methID) {


    }

}
