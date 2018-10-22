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

  customerFirm = 'BspFirma';
  customerContactPerson = 'Ansprechpartner';
  customerStreet = 'Straße + HausNr.';
  customerPostCode = 'PLZ';
  customerCity = 'Ort';
  customerCountry = 'Land';
  customerAdress: string;

  invoice: Invoice;
  invoiceCurrency = '€';
  invoiceNumber = '201800xx';
  invoiceIntendedUse = 'die RechnungsNr. 201800xx';
  invoiceDate: Date;
  invoiceDueDate: Date;
  invoiceTimeSpan = '2018-01-01 bis 2018-12-31';
  invoiceState = 'Entwurf'; // <th>Status (Entwurf, bezahlt, ...)</th>

  invoiceKind: InvoiceKind;

  items: Item[];

  nettoSum: number;
  percentageString: string;
  salesTax: number;
  salesTaxPercentage = 19;

  timespan: string;

  testNumber = 100;

  //endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private invoiceService: InvoiceService
  ) {
    this.invoiceDate = new Date();
    console.log('constDate: ' + this.invoiceDate.toString());
    this.invoiceKind = new InvoiceKind();
  }

  ngOnInit() {
    this.creatingInvoice = !this.hasReceivedInvoiceId();
    if (!this.creatingInvoice) {
      this.receiveInvoiceById(this.invoiceId);
      this.calculateInitialDataLoad();
    } else {
      this.invoiceId = this.invoiceService.createNewInvoiceId();
      this.calculateInitialDataCreate();
    }

  }


  //region other methods
    public addItemBtn(): void {
        const invoice = Invoice.createNewInvoice();
        /* INVOICES.push(invoice);
        const invoiceId = invoice.getID();
        this.router.navigateByUrl('invoice-detail/' + invoiceId); */
    }

  calculateInitialDataLoad() {
    console.log('method calculateInitialDataLoad() {...}');
    this.nettoSum = this.calculateNettoSum(this.invoiceId);
    this.percentageString = this.invoiceService.getSalesTaxPercentageString(this.invoiceId);
    this.salesTax = this.calculateSalesTax(this.invoiceId); // hier
    this.bruttoSum = this.calculateBruttoSum(this.invoiceId);
    // this.wholeCost = this.bruttoSum;
    // this.invoiceCurrency = this.invoice.currency;
    /* this.invoiceDate = new Date();
    console.log('this.invoiceDate: ' + this.invoiceDate.toString());
    this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
      this.invoiceDate.getDate() + 14, 12);
    console.log('this.invoiceDueDate: ' + this.invoiceDueDate.toString()); */
    // this.invoiceDueDate = new Date(this.invoiceDate.getTime() + 14 * 24 * 3600 * 1000);
  }

  calculateInitialDataCreate() {
    console.log('method calculateInitialDataCreate() {...}');
    this.invoiceDate = new Date();
    console.log('this.invoiceDate: ' + this.invoiceDate.toString());
    this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
      this.invoiceDate.getDate() + 14, 12);
    console.log('this.invoiceDueDate: ' + this.invoiceDueDate.toString());

  }

  calculateSavingData() {
    this.nettoSum = this.calculateNettoSum(this.invoiceId);
    this.salesTax = this.calculateSalesTax(this.invoiceId); // hier
    this.bruttoSum = this.calculateBruttoSum(this.invoiceId);
    // this.invoice.wholeCost = this.bruttoSum;
    this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
      this.invoiceDate.getDate() + 14, 12);
    // this.invoiceDueDate = new Date(this.invoiceDate.getTime() + 14 * 24 * 3600 * 1000);
  }

  calculateBruttoSum(methId: string): number {
    // var methInvoice: Invoice;
    // methInvoice = this.invoice;
    return this.calculateNettoSum(methId) + this.calculateSalesTax(methId);
  }

  calculateNettoSum(methId: string): number {
    // var methInvoice: Invoice;
    let methSum = 0;
    // methInvoice = this.invoice;
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

  hasReceivedInvoiceId():
    boolean {
    if (this.route.snapshot.paramMap.has('invoiceId')) {
      this.invoiceId = this.route.snapshot.paramMap.get('invoiceId');  // get itemID from URL
      return true;
    } else {
      this.invoiceId = null; // stands for the creation of a new item
      return false;
    }
  }

  invoiceDateChange(methEvent: string) {
    console.log('Methode invoiceDateChange(...) aufgerufen mit: ' + methEvent);
    this.invoiceDate = new Date(methEvent);
    console.log(typeof this.testNumber);
    console.log(typeof this.invoiceDate);
    console.log('Neuer Wert invoiceDate: ' + this.invoiceDate.toString());
    this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
      this.invoiceDate.getDate() + 14, 12);
  }

  invoiceNumberChange(e: string) {
    this.invoiceNumber = e;
    this.invoiceIntendedUse = 'die RechnungsNr. ' + this.invoiceNumber;
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
        this.timespan = invoice.timeSpan;

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
    if (this.creatingInvoice) {
      /* this.invoiceService.saveNewItemByInvoiceId(this.invoiceId, this.count, this.currency,
          this.hourPayment, this.itemDate, this.itemName, this.partialCost); */
      this.invoiceService.saveNewInvoice(this.countReminders, this.invoiceCurrency, this.invoiceDate, this.invoiceDueDate,
        this.invoiceNumber, this.invoiceIntendedUse, this.invoiceState, this.customerAdress, this.salesTaxPercentage, 'unknown',
        this.bruttoSum);
      this.creatingInvoice = false;
      this.creatingInvoiceBtn = false;
    } else {
      console.log('invoice-detail.component.ts this.invoiceCurrency: ' + this.invoiceCurrency);
      this.invoiceService.saveInvoiceGlobalsByInvoiceId(this.invoiceId, this.countReminders, this.invoiceCurrency, this.invoiceDate,
        this.invoiceDueDate, this.invoiceNumber, this.invoiceIntendedUse, this.invoiceState, this.customerAdress,
        this.salesTaxPercentage, 'unknown',
        this.bruttoSum);
    }
  }

    backToInvoiceList(): void {
        if (this.creatingInvoice || this.creatingInvoiceBtn) {
            this.creatingInvoice = false;
            this.creatingInvoiceBtn = false;
            this.invoiceService.removeLastInvoice();
        }
      this.router.navigateByUrl('/invoice-list');
    }

  //endregion


}
