import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./invoice/invoice.module').then((module) => module.InvoiceModule),
      canActivate: [AuthGuard]
  },
  //{ path: '', redirectTo: '/invoices', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
