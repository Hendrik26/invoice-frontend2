import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {InvoiceService} from '../invoice.service';
import {isNullOrUndefined} from 'util';

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

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.receiveInvoices();
    this.companySelectOptions = this.calculateCompanySelectOptions(this.invoices);
    this.companySelectOptions2 = this.calculateCompanySelectOptions2(this.invoices);
  }

  //region other methods
  changeFilterStartDate(e: string) {
    console.log('Methode changeFilterStartDate(...) aufgerufen mit: ', e);
    this.filterStartDate = e ? new Date(e) : null;
    // this.filterInvoice(this.invoices);
  }

  //endregion

  changeFilterEndDate(e: string) {
    console.log('Methode changeFilterEndDate(...) aufgerufen mit: ' + e);
    this.filterEndDate = e ? new Date(e) : null;
  }

  changeFilterStartDueDate(e: string) {
    console.log('Methode changeFilterStartDueDate(...) aufgerufen mit: ', e);
    this.filterStartDueDate = e ? new Date(e) : null;
    // this.filterInvoice(this.invoices);
  }

  changeFilterEndDueDate(e: string) {
    console.log('Methode changeFilterEndDueDate(...) aufgerufen mit: ' + e);
    this.filterEndDueDate = e ? new Date(e) : null;
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

  filterInvoice(invoices: Invoice[]): Invoice[] {
    console.log('Start Method filterInvoice' + '');
    // TODO filter
    return invoices
      .filter(invoice => this.dateGreaterEqualThen(invoice.invoiceDate, this.filterStartDate))
      .filter(invoice => this.dateGreaterEqualThen(this.filterEndDate, invoice.invoiceDate))
      .filter(invoice => this.dateGreaterEqualThen(invoice.invoiceDueDate, this.filterStartDueDate))
      .filter(invoice => this.dateGreaterEqualThen(this.filterEndDueDate, invoice.invoiceDueDate))
      .filter(invoice => this.checkInvoiceState(invoice, this.invoiceFilterState))
      .filter(invoice => this.checkInvoiceCompanyName(invoice, this.invoiceFilterCompany))
      ;
    // console.log('Finish Method Filter');
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
