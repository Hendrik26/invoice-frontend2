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
    companySelectOptions: object[];
    companySelectOptions2: string[];
    invoiceFilterCompany: string;

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.receiveInvoices();
        this.companySelectOptions = this.calculateCompanySelectOptions(this.invoices);
        this.companySelectOptions2 = this.calculateCompanySelectOptions2(this.invoices);
    }

    //region getter
    private getGreatPastDate(): Date {
        return new Date('1871-01-18');
    }

    //endregion


    //region other methods
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
        if (!date1) {
            return true;
        }
        console.log('First DateComparison!');
        if (!date2) {
            return true;
        }
        console.log('Second DateComparison!');
        const ret: boolean = (date1.getTime() >= date2.getTime());
        console.log('Third DateComparison!, ret=' + ret + ' Finish method');
        return ret;
    }

    private checkInvoiceState(invoice: Invoice, filterState: string): boolean {
        if (filterState == undefined) return true;
        if (filterState == null) return true;
        if (filterState.trim() == '') return true;
        if (filterState.trim().toLowerCase() == 'none') return true;
        if (filterState.trim().toLocaleLowerCase() == 'kein') return true;

        if (filterState.trim() == invoice.invoiceState) {
            return true;
        } else {
            return false;
        }
    }

    private checkInvoiveCompany(invoice: Invoice, companyNames: string[]): boolean {
        let ret = false;
        companyNames.forEach(function (value) {
            if (value.trim().toLowerCase() == invoice.companyName().trim().toLowerCase()) {
                ret = true;
            }
        });
        return ret;
    }

    calculateCompanySelectOptions(invoices: Invoice[]): object[] {
        const retList: object[] = [];
        invoices.forEach(function (fktInvoice) {
            retList.push({value: fktInvoice.companyName(), name: fktInvoice.companyName()});
        });
        return retList;
    }

    calculateCompanySelectOptions2(invoices: Invoice[]): string[] {
        return Array.from(new Set(Invoice.companyNames(invoices))); // unique array
    }


    filterInvoice(invoices: Invoice[]): Invoice[] {
        console.log('Start Method filterInvoice' + '');
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

    //endregion

}
