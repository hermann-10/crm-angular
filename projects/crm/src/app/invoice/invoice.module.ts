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
import { InvoiceService } from './invoice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceGenerateComponent } from './invoice-generate/invoice-generate.component';


registerLocaleData(localeFr);

const routes: Routes = [
  { path: '', component: InvoicesListComponent },
  { path: 'create', component: InvoiceCreationComponent },
  { path: 'detail/:id', component: InvoiceDetailComponent },
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
    InvoiceDetailComponent,
    InvoiceGenerateComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    // Nous déclarons auprès de l'injecteur du InvoiceModule qu'il pourra fournir une instance de InvoiceService
    // à tous ceux qui en ont besoin dans ce module
    InvoiceService,
    // Nous déclarons auprès de l'injecteur du InvoiceModule qu'il pourra fournir une instance de AuthInterceptor
    AuthInterceptor,
    // Enfin, nous déclarons que AuthInterceptor doit être utilisé pour intercepter les requêtes HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class InvoiceModule {}
