import { WarehouseComponent } from './component/component_warehouse/warehouse.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './component/component_request/request.component';
import { MenuComponent } from './component/component_menu/menu.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'request/:function/:request', component: RequestComponent},
  {path: 'warehouse/:function', component: WarehouseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
