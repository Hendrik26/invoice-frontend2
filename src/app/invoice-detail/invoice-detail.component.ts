import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {InvoiceListComponent} from '../invoice-list/invoice-list.component';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

    items: Item[] = [

        {
            id: 1, itemDate: '2016-04-01', itemName: 'Programmieren',
            partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
        },
        {
            id: 2, itemDate: '2016-04-30', itemName: 'Datenbank-Design',
            partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'
        }

    ];

    invoiceId: number;


    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.getInvoice();

    }

    getInvoice(): void {
        this.invoiceId = +this.route.snapshot.paramMap.get('invoiceId');
    }

    openItemDetail(methID) {


    }

}
