import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Customer} from './customer';
import {CUSTOMERS} from './mock-customer';
import {CustomerType} from './customer-type';
import {Invoice} from './invoice';
import {INVOICES} from './mock-invoice';




@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor() { }


    // region getter
    getCustomers(): Observable<Customer[]> {
        return of(CUSTOMERS);
    }

    getCustomerObservableById(methId: string): Observable<Customer> {
        let methCustomer: Customer;
        for (let i = 0; i < CUSTOMERS.length; i++) {
            if (CUSTOMERS[i].getCustomerId() === methId) {
                methCustomer = CUSTOMERS[i];
            }
        }
        return of(methCustomer);
    }


    // endregion

}
