import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestComponent } from './component/component_request/request.component';
import { RequestService } from './service/service_request/request.service';
import { MenuComponent } from './component/component_menu/menu.component';
import { WarehouseComponent } from './component/component_warehouse/warehouse.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    MenuComponent,
    WarehouseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  entryComponents: [],
  providers: [HttpClientModule, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
