import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoiceDetailComponent} from './invoice-detail/invoice-detail.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';

@NgModule({
  exports: [RouterModule]
})
export class InvoiceRouterModule {
}

const routes: Routes = [
  {path: 'invoice-list', component: InvoiceListComponent},
  {path: 'invoice-detail', component: InvoiceDetailComponent},
  {path: 'item-detail', component: ItemDetailComponent}
];
