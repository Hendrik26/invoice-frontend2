import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {Location} from '@angular/common';

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
    creatingCustomer: boolean;
    creatingCustomerBtn: boolean;
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
        this.creatingCustomer = false;
        this.receivedCustomerIdError = !this.hasReceivedCustomerId();
        if (!this.receivedCustomerIdError) {
            this.receiveCustomerById(this.customerId);
        }
    }

    hasReceivedCustomerId(): // can NOT be deleted
        boolean {
        if (this.route.snapshot.paramMap.has('customerId')) {
            this.customerId = this.route.snapshot.paramMap.get('customerId');  // get customerID???? customerId from URL
            return true;
        } else {
            this.customerId = null; // stands for the creation of a new customer
            return false;
        }
    }

    receiveCustomerById(methId: string): void {
        this.customerService.getCustomerObservableById(methId)
            .subscribe(invoice => {
                this.customerNumber = invoice.customerNumber;
                this.customerName = invoice.customerName;
                this.country = invoice.country;
                this.postalCode = invoice.postalCode;
                this.city = invoice.city;
                this.addressLine1 = invoice.addressLine1;
                this.addressLine2 = invoice.addressLine2;
                this.addressLine3 = invoice.addressLine3;
                this.customerSalesTaxNumber = invoice.customerSalesTaxNumber;
                this.creationTime = invoice.creationTime;
            });
        // Empfängt Daten aus einem Datenstream

    }


}
