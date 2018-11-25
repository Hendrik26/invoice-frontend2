import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Customer} from './customer';
import {CUSTOMERS} from './mock-customer';
import {CustomerType} from './customer-type';
import {Invoice} from './invoice';
import {INVOICES} from './mock-invoice';
import {InvoiceKind} from './invoice-kind';


@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor() {
    }


    // region getter
    public getCustomers(): Observable<Customer[]> {
        return of(CUSTOMERS);
    }

    public getCustomerObservableById(methCostumerId: string): Observable<Customer> {
        let methCustomer: Customer;
        for (let i = 0; i < CUSTOMERS.length; i++) {
            if (CUSTOMERS[i].getCustomerId() === methCostumerId) {
                methCustomer = CUSTOMERS[i];
            }
        }
        return of(methCustomer);
    }
    // endregion


    public saveCustomerGlobalsByCustomerId(methCostumerId: string, customerNumber: string, customerName: string, country: string,
                                           postalCode: string, city: string, addressLine1: string, addressLine2: string,
                                           addressLine3: string, customerSalesTaxNumber: string, creationTime: Date): void {
        let methCustomer: Customer;
        for (let i = 0; i < CUSTOMERS.length; i++) {
            if (CUSTOMERS[i].getCustomerId() === methCostumerId) {
                methCustomer = CUSTOMERS[i];
            }
        }
        methCustomer.customerNumber = customerNumber;
        methCustomer.customerName = customerName;
        methCustomer.country = country;
        methCustomer.postalCode = postalCode;
        methCustomer.city = city;
        methCustomer.addressLine1 = addressLine1;
        methCustomer.addressLine2 = addressLine2;
        methCustomer.addressLine3 = addressLine3;
        methCustomer.customerSalesTaxNumber = customerSalesTaxNumber;
        methCustomer.creationTime = creationTime;
    }

    public removeCustomerById(CostumerId: string): void {
        for (let i = 0; i < CUSTOMERS.length; i++) {
            if (CUSTOMERS[i].getCustomerId() === CostumerId) {
                CUSTOMERS.splice(i, 1);
            }
        }
    }

}
