import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {InvoiceService} from '../invoice.service';

// new imports added
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {InvoiceListComponent} from '../invoice-list/invoice-list.component';
import {Invoice} from '../invoice';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

    // IDs
    invoiceId: string;
    // other Propetrties

    bruttoSum: number;
    countReminders: number;
    creatingInvoice: boolean;
    currency: string;

    customerFirm = 'BspFirma';
    customerContactPerson = 'Ansprechpartner';
    customerStreet = 'Straße + HausNr.';
    customerPostCode = 'PLZ';
    customerCity = 'Ort';
    customerCountry = 'Land';
    customerAdress: string;

    invoice: Invoice;
    invoiceNumber = '201800xx';
    invoiceIntendedUse = 'die RechnungsNr. 201800xx';
    invoiceDate: Date;
    invoiceDueDate: Date;
    invoiceTimeSpan = '2018-01-01 bis 2018-12-31';
    invoiceState = 'template'; // <th>Status (Entwurf, bezahlt, ...)</th>
    invoiceCurrency = '€';

    nettoSum: number;
    percentageString: string;
    salesTax: number;
    salesTaxPercentage = 19;

    timespan: string;


    // invoices: Invoice[];
    testNumber = 100;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private invoiceService: InvoiceService
    ) {
        this.invoiceDate = new Date();
        console.log('constDate: ' + this.invoiceDate.toString());
    }

    ngOnInit() {
        this.receiveInvoiceId();
        // this.receiveInvoices();
        this.creatingInvoice = false;
        this.receiveInvoiceById(this.invoiceId);
        this.calculateInitialData();
    }

    calculateInitialData() {
        this.nettoSum = this.calculateNettoSum(this.invoiceId);
        this.percentageString = this.invoiceService.getSalesTaxPercentageString(this.invoiceId);
        this.salesTax = this.calculateSalesTax(this.invoiceId); // hier
        this.bruttoSum = this.calculateBruttoSum(this.invoiceId);
        this.invoice.wholeCost = this.bruttoSum;
        this.currency = this.invoice.currency;
        this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
            this.invoiceDate.getDate() + 14, 12);
        // this.invoiceDueDate = new Date(this.invoiceDate.getTime() + 14 * 24 * 3600 * 1000);

    }

    calculateBruttoSum(methId: string): number {
        var methInvoice: Invoice;
        methInvoice = this.invoice;
        return this.calculateNettoSum(methId) + this.calculateSalesTax(methId);
    }

    calculateNettoSum(methId: string): number {
        var methInvoice: Invoice;
        var methSum = 0;
        methInvoice = this.invoice;
        for (var i = 0; i < methInvoice.items.length; i++) {
            methSum += methInvoice.items[i].wholeCost;
        }
        return methSum;
    }

    calculateSalesTax(methId: string): number {
        var methInvoice: Invoice;
        methInvoice = this.invoice;
        return this.calculateNettoSum(methId) * methInvoice.salesTaxPercentage / 100;
    }

    invoiceDateChange(methEvent: string) {
        this.invoiceDate = new Date(methEvent);
        console.log('Methode invoiceDateChange(...) aufgerufen mit: ' + methEvent);
        console.log(typeof this.testNumber);
        console.log(typeof this.invoiceDate);
        console.log('Neuer Wert invoiceDate: ' + this.invoiceDate.toString());
        this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
            this.invoiceDate.getDate() + 14, 12);
        // this.invoiceDueDate = new Date(this.invoiceDate.getTime() + 14 * 24 * 3600 * 1000);
    }

    invoiceNumberChange() {
        this.invoiceIntendedUse = 'die RechnungsNr. ' + this.invoiceNumber;
    }


    receiveInvoiceId():
        void {
        this.invoiceId = this.route.snapshot.paramMap.get('invoiceId');  // get invoiceID from URL
        // this.invoiceId = +this.route.snapshot.paramMap.get('invoiceId');  // + converts string to number
    }

    receiveInvoiceById(methId: string): void {
        this.invoiceService.getInvoiceObservableById(methId)
            .subscribe(invoice => this.invoice = invoice);
        // Empfängt Daten aus einem Datenstream, d.h. wenn sich invoice ändert übernimmt this.invoice die Daten von invoice
        this.countReminders = this.invoice.countReminders;
        this.currency = this.invoice.currency;
        this.invoiceDate = this.invoice.invoiceDate;
        this.invoiceNumber = this.invoice.invoiceNumber;
        this.invoiceState = this.invoice.invoiceState;
        this.customerAdress = this.invoice.recipient;
        this.salesTaxPercentage = this.invoice.salesTaxPercentage;
        this.timespan = this.invoice.timeSpan;
    }

    saveInvoice(): void {
        // this.wholeCost = this.count * this.partialCost;
        this.calculateInitialData();
        if (this.creatingInvoice) {
            /* this.invoiceService.saveNewItemByInvoiceId(this.invoiceId, this.count, this.currency,
                this.hourPayment, this.itemDate, this.itemName, this.partialCost); */
            this.creatingInvoice = false;
        } else {
            this.invoiceService.saveInvoiceGlobalsByInvoiceId(this.invoiceId, this.countReminders, this.currency, this.invoiceDate,
                this.invoiceNumber, this.invoiceState, this.customerAdress, this.salesTaxPercentage, 'unknown', this.bruttoSum);
        }
    }


}
