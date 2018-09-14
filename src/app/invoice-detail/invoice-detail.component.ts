import { Component, OnInit } from '@angular/core';
import {Item002} from '../item002';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

    items: Item002[] = [

        {id: 1, itemDate: '2016-04-01', itemName: 'Programmieren',
            partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'},
        {id: 2, itemDate: '2016-04-30', itemName: 'Datenbank-Design',
            partialCost: 60.00, count: 5, wholeCost: 300, hourPayment: false, currency: '€'}

];

  constructor() { }

  ngOnInit() {
  }

}
