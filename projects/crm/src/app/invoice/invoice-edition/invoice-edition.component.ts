import { Component, OnInit } from '@angular/core';
import { Invoice } from '../invoice';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-invoice-edition',
  template: `
    <div class="bg-light p-5 rounded">
      <h1>Modifier une facture</h1>
      <p class="alert bg-info text-white">
        Remplissez les informations de la facture afin de la retrouver dans
        votre liste plus tard !
      </p>
      <p class="alert bg-warning text-white" *ngIf="errorMessage">
        {{ errorMessage }}
      </p>

      <app-invoice-form (invoice-submit)="onSubmit($event)"></app-invoice-form>
    </div>
  `,
  styles: [],
})
export class InvoiceEditionComponent implements OnInit {
  errorMessage = '';
  invoice?: Invoice;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        switchMap((id) => this.invoiceService.find(+id!))
      )
      .subscribe((invoice: any) => {
        this.invoice = invoice;
      });
  }

  onSubmit(invoice: Invoice) {}
}
