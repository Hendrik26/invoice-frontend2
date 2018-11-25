import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {Location} from '@angular/common';
import {InvoiceKind} from '../invoice-kind';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

    // region IDs
    customerId: string;
    // endregion

    // region other properties
    //creatingCustomer: boolean;
    //creatingCustomerBtn: boolean;
    newCustomer: boolean;
    receivedCustomerIdError: boolean;
    customerNumber: string; // Kundennummer
    customerName: string;  // Kundenname
    country: string;
    postalCode: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    customerSalesTaxNumber: string;
    creationTime: Date;

    // endregion
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private customerService: CustomerService) {
    }

    ngOnInit() {
        this.newCustomer = false;
        this.receivedCustomerIdError = !this.hasReceivedCustomerId();
        if (!this.receivedCustomerIdError) {
            this.receiveCustomerById(this.customerId);
        }
    }

    hasReceivedCustomerId(): // can NOT be deleted
        boolean {
        if (this.route.snapshot.paramMap.has('customerId') && this.route.snapshot.paramMap.has('newCustomer')) {
            this.customerId = this.route.snapshot.paramMap.get('customerId');  // get customerID???? customerId from URL
            this.newCustomer = (this.route.snapshot.paramMap.get('newCustomer') === 'true');
            return true;
        } else {
            this.customerId = null; // stands for the creation of a new customer
            return false;
        }
    }

    receiveCustomerById(methId: string): void {
        this.customerService.getCustomerObservableById(methId)
            .subscribe(customer => {
                this.customerNumber = customer.customerNumber;
                this.customerName = customer.customerName;
                this.country = customer.country;
                this.postalCode = customer.postalCode;
                this.city = customer.city;
                this.addressLine1 = customer.addressLine1;
                this.addressLine2 = customer.addressLine2;
                this.addressLine3 = customer.addressLine3;
                this.customerSalesTaxNumber = customer.customerSalesTaxNumber;
                this.creationTime = customer.creationTime;
            });
    }

    saveCustomer(): void {
        this.newCustomer = false;
        this.customerService.saveCustomerGlobalsByCustomerId(
            this.customerId,
            this.customerNumber,
            this.customerName,
            this.country,
            this.postalCode,
            this.city,
            this.addressLine1,
            this.addressLine2,
            this.addressLine3,
            this.customerSalesTaxNumber,
            this.creationTime
        );
        this.router.navigateByUrl('/customer-list');
    }

    backToCustomerList(): void {
        if (this.newCustomer) {
            this.newCustomer = false;
            this.customerService.removeCustomerById(this.customerId)
        }
        this.router.navigateByUrl('/customer-list');
    }


}
