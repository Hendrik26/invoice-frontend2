import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {InvoiceService} from '../invoice.service';
import {isNullOrUndefined} from 'util';
import {ThreeStateButton} from '../three-state-button';

@Component({
    selector: 'app-invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {


    // invoicesNew: Invoice[] = [{...this.invoiceService.standardInvoice}]; // clones this.standardInvoice


    // invoicesNew: Invoice[] = [new Invoice('In001', this.)]; // clones this.standardInvoice

    //region other properties
    invoices: Invoice[];
    filterStartDate: Date;
    filterEndDate: Date;
    filterStartDueDate: Date;
    filterEndDueDate: Date;
    invoiceFilterState = 'none';
    companySelectOptions: object[];
    companySelectOptions2: string[];
    invoiceFilterCompany = '--alle--';

    //endregion

    //region ThreeStateButtons
    sortStartDueDate: ThreeStateButton;
    sortEndDueDate: ThreeStateButton;
    sortStartDate: ThreeStateButton;
    sortEndDate: ThreeStateButton;

    //endregion

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.receiveInvoices();
        this.companySelectOptions = this.calculateCompanySelectOptions(this.invoices);
        this.companySelectOptions2 = this.calculateCompanySelectOptions2(this.invoices);
        this.sortStartDueDate = new ThreeStateButton('DueDate');
        this.sortStartDate = new ThreeStateButton('Date');

    }

    sortStartDueDateClick(): void {
        this.sortStartDate.reset();
        this.sortStartDueDate.switch();
    }

    sortStartDateClick(): void {
        this.sortStartDueDate.reset();
        this.sortStartDate.switch();
    }


    //region other methods
    changeFilterStartDate(e: string) {
        this.filterStartDate = e ? new Date(e) : null;
    }

    changeFilterEndDate(e: string) {
        this.filterEndDate = e ? new Date(e) : null;
    }


    changeFilterStartDueDate(e: string) {
        this.filterStartDueDate = e ? new Date(e) : null;
    }

    changeFilterEndDueDate(e: string) {
        this.filterEndDueDate = e ? new Date(e) : null;
    }


    //endregion


    public dateGreaterEqualThen(date1: Date, date2: Date): boolean {
        if (!date1) {
            return true;
        }
        if (!date2) {
            return true;
        }
        const ret: boolean = (date1.getTime() >= date2.getTime());
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
        const companyNames = Array.from(new Set(Invoice.companyNames(invoices))); // array unique
        // makes sure that all elements in array are unique
        companyNames.push('--alle--');
        return companyNames.sort();
    }

    sortInvoices(sortBy: string, ascending: boolean, invoices: Invoice[]): Invoice[] {
        // sortBy: Groesse, nach der sortiert werden soll
        let ascendingFactor = -1;
        if (ascending) {
            ascendingFactor = +1;
        }

        if (sortBy == 'Date') {
           invoices.sort(function (a, b) {
                return ascendingFactor * a.invoiceDate.getTime() - ascendingFactor * b.invoiceDate.getTime();
            });
        }

        if (sortBy == 'DueDate') {
           invoices.sort(function (a, b) {
                return ascendingFactor * a.invoiceDueDate.getTime() - ascendingFactor * b.invoiceDueDate.getTime();
            });
        }

        return invoices;
    }

    sortInvoicesByButtons(sortButtons: ThreeStateButton[], invoices: Invoice[]): Invoice[] {
        let retInvoices: Invoice[] = invoices;
        if (!sortButtons) {
            return invoices;
        }
        ;


        for (const sortButton of sortButtons) {
            if (sortButton.getSortingOrderId() != 0) {
                retInvoices = this.sortInvoices(sortButton.getSortBy(), (sortButton.getSortingOrderId() == 1), invoices);
            }
        }
        ;
        return retInvoices;
    }


    filterInvoice(invoices: Invoice[]): Invoice[] {
        // TODO filter
        let retInvoices = invoices
            .filter(invoice => this.dateGreaterEqualThen(invoice.invoiceDate, this.filterStartDate))
            .filter(invoice => this.dateGreaterEqualThen(this.filterEndDate, invoice.invoiceDate))
            .filter(invoice => this.dateGreaterEqualThen(invoice.invoiceDueDate, this.filterStartDueDate))
            .filter(invoice => this.dateGreaterEqualThen(this.filterEndDueDate, invoice.invoiceDueDate))
            .filter(invoice => this.checkInvoiceState(invoice, this.invoiceFilterState))
            .filter(invoice => this.checkInvoiceCompanyName(invoice, this.invoiceFilterCompany))
        ;
        let sortedInvoices = this.sortInvoicesByButtons([this.sortStartDueDate, this.sortStartDate], retInvoices);
        return sortedInvoices;
    }

    receiveInvoices(): void {
        this.invoiceService.getInvoices()
            .subscribe(invoices => this.invoices = invoices);
    }

    //region getter
    private getGreatPastDate(): Date {
        return new Date('1871-01-18');
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

    private checkInvoiceCompanyName(invoice: Invoice, filterCompanyName: string): boolean {
        // Fragezeichen vor Doppelpunkt in ParamListe: Dieser Parameter kann Null werden
        if (isNullOrUndefined(filterCompanyName)) return true;
        if (filterCompanyName.trim().toLowerCase() == '') return true;

        if (filterCompanyName.trim().toLowerCase() == '--alle--') return true;
        if (filterCompanyName.trim() == invoice.companyName()) {
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

    //endregion

}
