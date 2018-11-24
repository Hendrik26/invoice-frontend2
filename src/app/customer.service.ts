import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Customer} from './customer';
import {CUSTOMERS} from './mock-customer';
import {CustomerType} from './customer-type';




@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor() { }


    // region getter
    getCustomers(): Observable<Customer[]> {
        return of(CUSTOMERS);
    }


    // endregion

}
