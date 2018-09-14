import { Component, OnInit } from '@angular/core';
import {Item002} from '../item002';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  currentItem: Item002 = {hourPayment: true, itemDate: new Date("July 4, 2016 10:13:00"), count: 1, partialCost: 30,
    itemName: 'C#-Entwicklung', currency: '€', wholeCost: 10, id: 1};

  constructor() { }

  ngOnInit() {
  }

}
