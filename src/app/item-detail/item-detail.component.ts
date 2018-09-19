import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {Invoice} from '../invoice';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

    currentItem: Item = {
        hourPayment: true, itemDate: '2016-04-01', count: 1, partialCost: 30,
        itemName: 'C#-Entwicklung', currency: '€', wholeCost: 10, id: 1
    };

    invoiceId: number;
    itemId: number;
    item: Item;
    nettoSum: number;
    percentageString: string;
    salesTax: number;
    bruttoSum: number;

    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.receiveInvoiceId();
        this.receiveItemId()
    }

    receiveInvoiceId():
        void {
        this.invoiceId = +this.route.snapshot.paramMap.get('invoiceId');  // get invoiceID from URL
    }

    receiveItemId():
        void {
        this.itemId = +this.route.snapshot.paramMap.get('itemId');  // get invoiceID from URL
    }

    togglePayment() {
        this.currentItem.hourPayment = !this.currentItem.hourPayment;
    }

}
