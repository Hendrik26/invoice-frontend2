import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import {isNullOrUndefined} from 'util';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {CUSTOMERS} from '../mock-customer';
import {Invoice} from '../invoice';
import {INVOICES} from '../mock-invoice';


@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

    // region other properties
    customers: Customer[];

    // endregion

    constructor(private customerService: CustomerService,
                private router: Router)  {  }

    ngOnInit() {
        this.receiveCustomers();
    }
    receiveCustomers(): void {
        this.customerService.getCustomers().subscribe(customers => this.customers = customers);
    }

    public newCustomereBtn(): void {
        const methCustomer = Customer.createNewCustomer();
        CUSTOMERS.push(methCustomer);
        const customerId = methCustomer.getCustomerId();
        this.router.navigateByUrl('customer-detail/' + customerId + '/true');
    }


}
