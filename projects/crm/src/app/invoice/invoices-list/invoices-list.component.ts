import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Invoice } from '../invoice';
import { invoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoices-list',
  template: `
    <div class="bg-light p-3 rounded">
      <div class="row">
        <div class="col-6"><h1>Liste de vos factures</h1></div>
        <!--<div class="col-6 text-right">
          <button class="btn btn-sm btn-primary" routerLink="/invoices/create">
            Créer une facture
          </button>
        </div>-->
        <div class="col-6">
          <button
            class="btn btn-sm btn-primary"
            (click)="sortInvoicesByDateAsc()"
          >
            Trier par date (ASC)<i class="fas fa-sort-amount-down"></i>
          </button>

          <button
            class="btn btn-sm btn-primary"
            (click)="sortInvoicesByDateDesc()"
          >
            Trier par date (DESC)<i class="fas fa-sort-amount-down"></i>
          </button>
        </div>
      </div>
      <hr />
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id.</th>
            <th>Client</th>
            <th>Description</th>
            <th>Date</th>
            <th>Total HT</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody *ngIf="invoices$">
          <tr *ngFor="let invoice of invoices$ | async">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.customer_name }}</td>
            <td>{{ invoice.description }}</td>
            <td>
              {{ invoice.created_at | date : 'short' : undefined : 'fr' }}
            </td>
            <td>{{ invoice.total | currency : 'CHF' }}</td>

            <td *ngIf="invoice.status === 'SENT'">
              <span class="badge bg-dark">Envoyé</span>
            </td>

            <td *ngIf="invoice.status === 'PAID'">
              <span class="badge bg-success">Payé</span>
            </td>

            <td *ngIf="invoice.status === 'CANCELED'">
              <span class="badge bg-danger">Annulé</span>
            </td>

            <td>
              <a
                routerLink="/invoices/{{ invoice.id }}"
                class="btn btn-sm btn-primary"
              >
                Voir
              </a>
              <!--<button
              type="button"
                class="btn btn-sm ms-1 btn-danger"
                (click)="deleteInvoice(invoice.id!)"
              >
                Supprimer
              </button>-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class InvoicesListComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;

  constructor(private invoiceService: invoiceService) {}

  ngOnInit(): void {
    console.log('INVOICES$ : ', this.invoiceService.findAll());
    this.invoices$ = this.invoiceService.findAll();
    this.sortInvoicesByDateDesc();
  }

  sortInvoicesByDateDesc() {
    this.invoices$ = this.invoices$.pipe(
      map((invoices) =>
        invoices.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      )
    );
  }

  sortInvoicesByDateAsc() {
    this.invoices$ = this.invoices$.pipe(
      map((invoices) =>
        invoices.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      )
    );
  }

  deleteInvoice(id: number) {
    this.invoiceService.delete(id);
    console.log('Invoice n°', id, 'deleted.');
  }
}
