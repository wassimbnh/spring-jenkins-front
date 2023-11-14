import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ContactComponent } from './contact/contact.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

const routes: Routes = [
  {path: '', redirectTo: '/invoice', pathMatch: 'full'},
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'supplier', component:SupplierComponent},
  { path: 'invoice', component: InvoiceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
