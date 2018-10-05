import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {InvoiceService} from '../invoice.service';

@Component({
    selector: 'app-invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {


    // invoicesNew: Invoice[] = [{...this.invoiceService.standardInvoice}]; // clones this.standardInvoice


    // invoicesNew: Invoice[] = [new Invoice('In001', this.)]; // clones this.standardInvoice

    invoices: Invoice[];
    filterStartDate: Date;
    filterEndDate: Date;
    invoiceFilterState: 'none';

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.receiveInvoices();
        /* if (this.invoices.length < 1) {
          this.invoices.push(new Invoice('Inn1', this.invoiceService.standardInvoice))
        } */
    }

    // getter
    private getGreatPastDate(): Date {
        return new Date('1871-01-18');
    }

    // other methods
    changeFilterStartDate(e: string) {
        console.log('Methode changeFilterStartDate(...) aufgerufen mit: ', e);
        this.filterStartDate = e ? new Date(e) : null;
       // this.filterInvoice(this.invoices);
    }

    changeFilterEndDate(e: string) {
        console.log('Methode changeFilterEndDate(...) aufgerufen mit: ' + e);
        this.filterEndDate = e ? new Date(e) : null;
    }

    public dateGreaterEqualThen(date1: Date, date2: Date): boolean {
        console.log('Start method dateGreaterEqualThen(...){...}');
        if (!date1) { return true; }
        console.log('First DateComparison!');
        if (!date2) { return true; }
        console.log('Second DateComparison!');
        const ret: boolean = (date1.getTime() >= date2.getTime());
        console.log('Third DateComparison!, ret=' + ret + ' Finish method');
        return ret;
    }

    private checkInvoiceState(invoice: Invoice, filterState: string): boolean {
      if (filterState.trim() == '') return true;
      if (filterState.trim().toLowerCase() == 'none') return true;
      if (filterState.trim().toLocaleLowerCase() == 'kein') return true;
      if (filterState.trim() == undefined) return true;
      if (filterState.trim() == null) return true;
      if (filterState.trim() == invoice.invoiceState) {
        return true;
      } else {
        return false;
      }
    }

    filterInvoice(invoices: Invoice[]): Invoice[] {
        console.log('Start Method filterInvoice' +
          '');
        // TODO filter
        return invoices
         .filter(invoice => this.dateGreaterEqualThen(invoice.invoiceDate, this.filterStartDate))
           // .filter(invoice => invoice.invoiceDate.getTime() >= this.getGreatPastDate().getTime())
             .filter(invoice => this.dateGreaterEqualThen(this.filterEndDate, invoice.invoiceDate))
          .filter(invoice => this.checkInvoiceState(invoice, this.invoiceFilterState))
            ;
        // console.log('Finish Method Filter');
    }

    receiveInvoices(): void {
        this.invoiceService.getInvoices()
            .subscribe(invoices => this.invoices = invoices);
    }

}
