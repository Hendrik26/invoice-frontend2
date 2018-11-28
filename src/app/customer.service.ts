import {Injectable} from '@angular/core';
import {Customer} from './customer';
import {CUSTOMERS} from './mock-customer';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ApolloQueryResult} from 'apollo-client';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private graphqlClient: Apollo) {
    }

    // region getter
    public getCustomers(): Observable<Customer[]> {
      return this.graphqlClient
      .query({
        query: gql`
          {
            customers { customerId customerSalesTaxNumber name
              billingAddress { addressLine1 addressLine2 addressLine3 city countryCode postalCode }
            }
          }
        `
      })
      .pipe(
        map((result: ApolloQueryResult<{ customers: any[] }>): Customer[] =>
          result.data.customers.map(customer =>
            new Customer(
              customer.customerId,
              {
                ...customer.billingAddress,
                country: customer.billingAddress.countryCode,
                creationTime: null,
                customerName: customer.name,
                customerNumber: null,
                customerSalesTaxNumber: customer.customerSalesTaxNumber
              }
            )
          )
        )
      );
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
