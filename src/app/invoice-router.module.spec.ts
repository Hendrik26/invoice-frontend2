import { InvoiceRouterModule } from './invoice-router.module';

describe('InvoiceRouterModule', () => {
  let invoiceRouterModule: InvoiceRouterModule;

  beforeEach(() => {
    invoiceRouterModule = new InvoiceRouterModule();
  });

  it('should create an instance', () => {
    expect(invoiceRouterModule).toBeTruthy();
  });
});
