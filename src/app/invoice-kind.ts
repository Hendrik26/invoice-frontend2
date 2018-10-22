export class InvoiceKind {

    private homeCountryInvoice: boolean; // Inlandsrechnung
    private timeSpanBased: boolean; // UZeitraumbasierter Rechnung
    private isSEPA: booean; // ist SEPA-Lastschrift



    // getter
    public getHomeCountryInvoice(): boolean {
        return this.homeCountryInvoice;
    }

    public getAbroadInvoice(): boolean {
        return !this.homeCountryInvoice;
    }

    public getTimeSpanBased(): boolean {
        return this.timeSpanBased;
    }

    public getSEPA(): boolean {
        return this.isSEPA;
    }

    public getPackedDataNumber(): number{
        return -1;
    }


    // settet
    public setHomeCountryInvoice(inValue: boolean): void {
        this.homeCountryInvoice = inValue;
    }

    public setAbroadInvoice(inValue: boolean): void {
        this.homeCountryInvoice = !inValue;
    }

    public setTimeSpanBased(inValue: boolean): void {
        this.timeSpanBased = inValue;
    }

    public setSEPA(inValue: boolean): void {
        this.isSEPA = inValue;
    }



}
