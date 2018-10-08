import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoiceDetailComponent} from './invoice-detail/invoice-detail.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/invoice-list', pathMatch: 'full'},
  {path: 'invoice-list', component: InvoiceListComponent},
  {path: 'invoice-detail/:invoiceId', component: InvoiceDetailComponent}, // routing to the details of a dedicated invoice by ID
  {path: 'invoice-create', component: InvoiceDetailComponent},
  {path: 'item-detail/:invoiceId/:itemId', component: ItemDetailComponent},
  {path: 'item-create/:invoiceId', component: ItemDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InvoiceRouterModule {
}
