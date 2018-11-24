import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {CUSTOMERS} from '../mock-customer';


@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

    // region other properties
    customers: Customer[];

    // endregion
    /*
    customer1 = {customerNumber: 'cus01', customerName: 'Schweizer Käse&Socken GmbH', country: 'Schweiz',postalCode: 'CH-0815',
        city: 'Bern', addressLine1: 'Almweg 88', addressLine2: '', addressLine3: '', customerSalesTaxNumber: '7-40-11'};
    customer2 = {customerNumber: 'cus02', customerName: 'DumpfbackeGmbH', country: 'DDR', postalCode: 'D-6969',
        city: 'Sömmerda', addressLine1: 'Waldweg 11', addressLine2: 'OT Tunzenhausen', addressLine3: '', customerSalesTaxNumber: '0-08-15'};
    customers = [this.customer1, this.customer2];


    receiveInvoices(): void {
        this.invoiceService.getInvoices()
            .subscribe(invoices => this.invoices = invoices);
    }
    */
    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.receiveCustomers();
    }
    receiveCustomers(): void {
        this.customerService.getCustomers().subscribe(customers => this.customers = customers);
    }


}
