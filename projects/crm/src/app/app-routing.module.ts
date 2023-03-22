import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.
      AuthModule),
  },
  {
    path: 'invoices',
    loadChildren: () => 
      import ('./invoice/invoice.module').then((module) => module.
      InvoiceModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
