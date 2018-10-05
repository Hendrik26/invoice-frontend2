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
        console.log('Methode changeFilterStartDate(...) aufgerufen mit: ' + e);
        this.filterStartDate = new Date(e);
       // this.filterInvoice(this.invoices);
    }

    public dateGreaterEqualThen(date1: Date, date2: Date): boolean {
        console.log('Start method dateGreaterEqualThen(...){...}');
        if (date1 == undefined) { return true; }
        console.log('First DateComparison!');
        if (date2 == undefined) { return true; }
        console.log('Second DateComparison!');
        let ret: boolean = (date1.getTime() >= date2.getTime());
        console.log('Third DateComparison!, ret=' + ret + ' Finish method');
        return ret;
    }

    filterInvoice(invoices: Invoice[]): Invoice[] {
        console.log('Start Method filterInvoice');
        // TODO filter
        return invoices
        .filter(invoice => this.dateGreaterEqualThen(invoice.invoiceDate, this.filterStartDate))
           // .filter(invoice => invoice.invoiceDate.getTime() >= this.getGreatPastDate().getTime())
            // .filter(invoice => invoice.invoiceDate.getTime() <= this.filterEndDate.getTime())
            ;
        // console.log('Finish Method Filter');
    }

    receiveInvoices(): void {
        this.invoiceService.getInvoices()
            .subscribe(invoices => this.invoices = invoices);
    }

}
