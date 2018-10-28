import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../invoice.service';
// new imports added
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Invoice} from '../invoice';
import {Item} from '../item';
import {InvoiceKind} from '../invoice-kind';
import {INVOICES} from '../mock-invoice';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {


    //region IDs
    invoiceId: string;
    //endregion


    //region other properties
    bruttoSum: number;
    countReminders: number;
    creatingInvoice: boolean;
    creatingInvoiceBtn: boolean;
    creditorIdentificationNunber = 'DE55ZZZ00001275596';

    customerFirm = 'BspFirma';
    customerContactPerson = 'Ansprechpartner';
    customerStreet = 'Straße + HausNr.';
    customerPostCode = 'PLZ';
    customerCity = 'Ort';
    customerCountry = 'Land';
    customerAdress: string;

    customerBIC = 'Invoice-Bsp-BIC';
    customerIBAN = 'Invoice-Bsp-IBAN';
    customerTaxNumber = 'murx';
    mandateIdentification = 'Invoice-Bsp-Mandat'; // Mandatsreferenz fuer SEPA-Lastschriftverfahren


    invoice: Invoice;
    invoiceCurrency = '€';
    invoiceNumber = '201800xx';
    invoiceIntendedUse = 'die Rechnungsnummer 201800xx';
    invoiceDate: Date;
    invoiceDueDate: Date;
    invoiceTimeSpan = '2018-01-01 bis 2018-12-31';
    invoiceState = 'Entwurf'; // <th>Status (Entwurf, bezahlt, ...)</th>

    invoiceKind: InvoiceKind;

    items: Item[];

    nettoSum: number;
    percentageString: string;
    receivedInvoiceIdError: boolean;
    salesTax: number;
    salesTaxPercentage = 19;

    timespanBegin: Date;
    timespanEnd: Date;

    testNumber = 100;

    //endregion

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private invoiceService: InvoiceService
    ) {
        this.invoiceDate = new Date();
        this.invoiceKind = new InvoiceKind();
    }

    ngOnInit() {
        console.log('ngOnInit ');
        this.creatingInvoice = false;
        this.receivedInvoiceIdError = !this.hasReceivedInvoiceId();
        if (!this.receivedInvoiceIdError) {
            console.log('receivedInvoiceId==' + this.invoiceId + ';;;', 'color:Blue');
            this.receiveInvoiceById(this.invoiceId);
        }

        console.log('this.creatingInvoiceBtn==' + this.creatingInvoiceBtn);


        if (!this.creatingInvoiceBtn) {
            console.log('this.creatingInvoiceBtn==' + this.creatingInvoiceBtn + '  ifZweig');
            // this.receiveInvoiceById(this.invoiceId);
            this.calculateInitialDataLoad();
            console.log('this.creatingInvoiceBtn==' + this.creatingInvoiceBtn + '  ifZweig');
        } else {
            console.log('this.creatingInvoiceBtn==' + this.creatingInvoiceBtn + '  elseZweig');
            // this.invoiceId = this.invoiceService.createNewInvoiceId();
            this.calculateInitialDataCreate();
        }
        this.calculateSums();
    }


    //region other methods
    public addItemBtn(): void { // can probably be deleted
        const i = 1;
        // const invoice = Invoice.createNewInvoice();
        /* INVOICES.push(invoice);
        const invoiceId = invoice.getID();
        this.router.navigateByUrl('invoice-detail/' + invoiceId); */
    }

    calculateInitialDataLoad() {
        console.log('method calculateInitialDataLoad() {...}');
        this.percentageString = this.invoiceService.getSalesTaxPercentageString(this.invoiceId);
        this.calculateSums();
    }

    calculateInitialDataCreate() {
        console.log('method calculateInitialDataCreate() {...}');
        this.invoiceDate = new Date();
        this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
            this.invoiceDate.getDate() + 14, 12);

    }

    calculateSums(): void {
        this.nettoSum = this.calculateNettoSum(this.invoiceId);
        this.salesTax = this.calculateSalesTax(this.invoiceId); // hier
        this.bruttoSum = this.calculateBruttoSum(this.invoiceId);
    }

    calculateSavingData() {
        this.calculateSums();
        // this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
        //  this.invoiceDate.getDate() + 14, 12);
    }

    calculateBruttoSum(methId: string): number {
        return this.invoiceKind.national ? (this.calculateNettoSum(methId) + this.calculateSalesTax(methId)) : this.calculateNettoSum(methId);
    }

    calculateNettoSum(methId: string): number {
        let methSum = 0;
        if (this.items !== undefined) {
            for (let i = 0; i < this.items.length; i++) {
                methSum += this.items[i].wholeCost;
            }
        }
        return methSum;
    }

    calculateSalesTax(methId: string): number {
        // var methInvoice: Invoice;
        // methInvoice = this.invoice;
        return this.calculateNettoSum(methId) * this.salesTaxPercentage / 100;
    }

    hasReceivedInvoiceId(): // can NOT be deleted
        boolean {
        if (this.route.snapshot.paramMap.has('invoiceId')) {
            this.invoiceId = this.route.snapshot.paramMap.get('invoiceId');  // get itemID???? invoiceId from URL
            return true;
        } else {
            this.invoiceId = null; // stands for the creation of a new item???? invoice
            return false;
        }
    }

    invoiceDateChange(methEvent: string) {
        this.invoiceDate = new Date(methEvent);
        this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
            this.invoiceDate.getDate() + 14, 12);
    }

    invoiceTimespanBeginChange(methEvent: string) {
        this.timespanBegin = new Date(methEvent);
        // this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
        //   this.invoiceDate.getDate() + 14, 12);
    }

    invoiceTimespanEndChange(methEvent: string) {
        this.timespanEnd = new Date(methEvent);
    }


    invoiceNumberChange(e: string) {
        this.invoiceNumber = e;
        this.invoiceIntendedUse = 'die Rechnungsnummer. ' + this.invoiceNumber;
    }


    receiveInvoiceId():
        void {
        this.invoiceId = this.route.snapshot.paramMap.get('invoiceId');  // get invoiceID from URL
        // this.invoiceId = +this.route.snapshot.paramMap.get('invoiceId');  // + converts string to number
    }

    receiveInvoiceById(methId: string): void {
        this.invoiceService.getInvoiceObservableById(methId)
            .subscribe(invoice => {
                // TODO remove this.invoice.....
                this.countReminders = invoice.countReminders;
                this.creatingInvoiceBtn = invoice.newCreatedInvoice;
                this.invoiceCurrency = invoice.currency;
                this.invoiceDate = invoice.invoiceDate;
                this.invoiceDueDate = invoice.invoiceDueDate;
                this.invoiceNumber = invoice.invoiceNumber;
                this.invoiceIntendedUse = invoice.invoiceIntendedUse;
                this.invoiceState = invoice.invoiceState;
                this.customerAdress = invoice.recipient;
                this.salesTaxPercentage = invoice.salesTaxPercentage;
                // this.timespan = invoice.timeSpan;
                // -----------------------------
                this.invoiceKind = invoice.invoiceKind;
                this.customerTaxNumber = invoice.customerTaxNumber;

                this.timespanBegin = invoice.timespanBegin;
                this.timespanEnd = invoice.timespanEnd;

                // this.items = [];
                // this.invoice.items.forEach((item) => {this.items.push({...item})});
                this.items = invoice.items;
            });
        // Empfängt Daten aus einem Datenstream, d.h. wenn sich invoice ändert übernimmt this.invoice die Daten von invoice

    }

    saveInvoice(): void {
        console.log('invoice-detail.component.ts: method saveInvoice');
        this.creatingInvoiceBtn = false;
        this.calculateSavingData();
        this.invoiceService.saveInvoiceGlobalsByInvoiceId(
            this.invoiceId,
            this.countReminders,
            this.invoiceCurrency,
            this.invoiceDate,
            this.invoiceDueDate,
            this.invoiceNumber,
            this.invoiceIntendedUse,
            this.invoiceState,
            this.customerAdress,
            this.salesTaxPercentage,
            'unknown',
            this.bruttoSum,
            this.invoiceKind,
            this.customerTaxNumber,
            this.timespanBegin,
            this.timespanEnd
        );
    }

    backToInvoiceList(): void {
        if (this.creatingInvoice || this.creatingInvoiceBtn) {
            this.creatingInvoice = false;
            this.creatingInvoiceBtn = false;
            this.invoiceService.removeInvoiceById(this.invoiceId);
        }
        this.router.navigateByUrl('/invoice-list');
    }

    private timespan(): string {
        const diffMonth: number = Math.round((this.timespanEnd.getTime()-this.timespanBegin.getTime()) / 1000 / 3600 / 24 / 30);
        return '(' + diffMonth + 'Monate)';
    }

    //endregion


}
