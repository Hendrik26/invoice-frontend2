import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {Invoice} from '../invoice';
import {ItemService} from '../item.service';
import {InvoiceService} from '../invoice.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

    currentItemOld: Item = {
        hourPayment: true, itemDate: '2016-04-01', count: 1, partialCost: 30,
        itemName: 'C#-Entwicklung', currency: '€', wholeCost: 10, id: 1
    };

    invoiceId: number;
    itemId: number;
    item: Item;
    currentItem: Item;
    nettoSum: number;
    percentageString: string;
    salesTax: number;
    bruttoSum: number;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private invoiceService: InvoiceService,
        private itemService: ItemService
    ) {
    }

    ngOnInit() {
        this.receiveInvoiceId();
        this.receiveItemId();
        this.receiveItemByIds(this.invoiceId, this.itemId);
    }

    receiveInvoiceId():
        void {
        this.invoiceId = +this.route.snapshot.paramMap.get('invoiceId');  // get invoiceID from URL
    }

    receiveItemId():
        void {
        this.itemId = +this.route.snapshot.paramMap.get('itemId');  // get invoiceID from URL
    }

    receiveItemByIds(methInvoiceId: number, methItemId: number): void {
        this.itemService.getItemByItemId(methInvoiceId, methItemId)
            .subscribe(item => this.currentItem = item);
        // Empfängt Daten aus einem Datenstream, d.h. wenn sich invoice ändert übernimmt this.invoice die Daten von invoice
    }

    togglePayment() {
        this.currentItem.hourPayment = !this.currentItem.hourPayment;
    }

}
