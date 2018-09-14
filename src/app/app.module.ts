import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { InvoiceRouterModule } from './/invoice-router.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InvoiceRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
