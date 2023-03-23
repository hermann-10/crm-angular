import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { InvoiceEditionComponent } from './invoice-edition/invoice-edition.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import localeFr from '@angular/common/locales/fr';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceFormGeneralComponent } from './invoice-form/invoice-form-general.component';
import { InvoiceFormDetailsComponent } from './invoice-form/invoice-form-details.component';
import { InvoiceFormTotalsComponent } from './invoice-form/invoice-form-totals.component';

registerLocaleData(localeFr);

const routes: Routes = [
  { path: '', component: InvoicesListComponent },
  { path: 'create', component: InvoiceCreationComponent },
  { path: ':id', component: InvoiceEditionComponent },
];

@NgModule({
  declarations: [
    InvoiceCreationComponent,
    InvoiceEditionComponent,
    InvoicesListComponent,
    InvoiceFormComponent,
    InvoiceFormGeneralComponent,
    InvoiceFormDetailsComponent,
    InvoiceFormTotalsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class InvoiceModule {}
