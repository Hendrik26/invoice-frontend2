import { Component, OnInit } from '@angular/core';
import {Item} from '../item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  currentItem: Item = {hourPayment: true, itemDate: "2016-04-01", count: 1, partialCost: 30,
    itemName: 'C#-Entwicklung', currency: '€', wholeCost: 10, id: 1};

  constructor() { }

  ngOnInit() {
  }

  togglePayment(){
    this.currentItem.hourPayment = ! this.currentItem.hourPayment;
  }

}
