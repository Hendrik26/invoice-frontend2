import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../invoice.service';
// new imports added
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Invoice} from '../invoice';
import {Item} from '../item';

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
  // currency: string;

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
  invoiceState = 'template'; // <th>Status (Entwurf, bezahlt, ...)</th>

  items: Item[];

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
    this.creatingInvoice = !this.hasReceivedInvoiceId();
    if (!this.creatingInvoice) {
      this.receiveInvoiceById(this.invoiceId);
      this.calculateInitialData();
    } else {
      this.invoiceId = Invoice.createNewInvoiceId();
    }

  }


  calculateInitialData() {
    this.nettoSum = this.calculateNettoSum(this.invoiceId);
    this.percentageString = this.invoiceService.getSalesTaxPercentageString(this.invoiceId);
    this.salesTax = this.calculateSalesTax(this.invoiceId); // hier
    this.bruttoSum = this.calculateBruttoSum(this.invoiceId);
    // this.wholeCost = this.bruttoSum;
    // this.invoiceCurrency = this.invoice.currency;
    this.invoiceDate = new Date();
    this.invoiceDueDate = new Date(this.invoiceDate.getFullYear(), this.invoiceDate.getMonth(),
      this.invoiceDate.getDate() + 14, 12);
    // this.invoiceDueDate = new Date(this.invoiceDate.getTime() + 14 * 24 * 3600 * 1000);
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
    for (let i = 0; i < this.items.length; i++) {
      methSum += this.items[i].wholeCost;
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
    this.invoiceDate = new Date(methEvent);
    console.log('Methode invoiceDateChange(...) aufgerufen mit: ' + methEvent);
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
        this.invoiceCurrency = invoice.currency;
        this.invoiceDate = invoice.invoiceDate;
        this.invoiceDueDate = invoice.invoiceDueDate;
        this.invoiceNumber = invoice.invoiceNumber;
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
    this.calculateSavingData();
    if (this.creatingInvoice) {
      /* this.invoiceService.saveNewItemByInvoiceId(this.invoiceId, this.count, this.currency,
          this.hourPayment, this.itemDate, this.itemName, this.partialCost); */
      this.invoiceService.saveNewInvoice(this.countReminders, this.invoiceCurrency, this.invoiceDate,
        this.invoiceDueDate, this.invoiceNumber, this.invoiceState, this.customerAdress, this.salesTaxPercentage, 'unknown',
        this.bruttoSum);
      this.creatingInvoice = false;
    } else {
      console.log('invoice-detail.component.ts this.invoiceCurrency: ' + this.invoiceCurrency);
      this.invoiceService.saveInvoiceGlobalsByInvoiceId(this.invoiceId, this.countReminders, this.invoiceCurrency, this.invoiceDate,
        this.invoiceDueDate, this.invoiceNumber, this.invoiceState, this.customerAdress, this.salesTaxPercentage, 'unknown',
        this.bruttoSum);
    }
  }


}
