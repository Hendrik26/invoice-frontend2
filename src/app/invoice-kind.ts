export class InvoiceKind {
  get international(): boolean {
    return this._international;
  }

  get national(): boolean {
    return !this._international;
  }


  set international(value: boolean) {
    this._international = value;
  }

  get timeSpanBased(): boolean {
    return this._timeSpanBased;
  }

  set timeSpanBased(value: boolean) {
    this._timeSpanBased = value;
  }

  get isSEPA(): boolean {
    return this._isSEPA;
  }

  set isSEPA(value: boolean) {
    this._isSEPA = value;
  }

    private _international: boolean; // Inlandsrechnung, Bit0
    private _timeSpanBased: boolean; // UZeitraumbasierter Rechnung, Bit1
    private _isSEPA: boolean; // ist SEPA-Lastschrift, Bit2

    private packedDataNumber: number;

    constructor() {
        this._international = false;
        this._timeSpanBased = false;
        this._isSEPA = false;
    }

    public static create(international: boolean, timeSpanBased: boolean, isSEPA:boolean): InvoiceKind {
      const invoiceKind = new InvoiceKind();
      invoiceKind.international = international;
      invoiceKind.timeSpanBased = timeSpanBased;
      invoiceKind.isSEPA = isSEPA;
      return invoiceKind;
    }


    // getter
    public getHomeCountryInvoice(): boolean {
        return this._international;
    }

    public getAbroadInvoice(): boolean {
        return !this._international;
    }


    public getPackedDataNumber(): number{
        return -1;
    }


    // settet

    public changeInternational(): void {
        this._international = !this._international;
    }

  public changeTimeSpanBased(): void {
    this._timeSpanBased = !this._timeSpanBased;
  }

  public changeIsSEPA(): void {
    this._isSEPA = !this._isSEPA;
  }






}
