import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, Observable, map, Subscription } from 'rxjs';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoices-list',
  template: `
    <div class="bg-light p-3 rounded">
      <h1>Liste de vos factures</h1>
      <div class="alert bg-danger" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
      <div class="row">
        <div class="col-6"></div>
        <!--<div class="col-6 text-right">
          <button class="btn btn-sm btn-primary" routerLink="/invoices/create">
            Créer une facture
          </button>
        </div>-->
        <!--<div class="col-6">
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
        </div>-->
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
        <tbody>
          <tr *ngFor="let invoice of invoices">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.customer_name }}</td>
            <td>{{ invoice.description }}</td>
            <td>
              {{ invoice.created_at | date : 'dd/MM/yyyy' : undefined : 'fr' }}
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
                routerLink="/invoices/detail/{{ invoice.id }}"
                class="btn btn-sm btn-primary"
              >
                Voir
              </a>
              <a
                routerLink="/invoices/{{ invoice.id }}"
                class="btn btn-sm btn-primary"
              >
                Modifier
              </a>
              <button
                type="button"
                class="btn btn-sm ms-1 btn-danger"
                (click)="deleteInvoice(invoice.id!)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class InvoicesListComponent implements OnInit {
  errorMessage = '';
  invoices$!: Observable<Invoice[]>;
  invoices: Invoice[] = [];
  destroy$ = new Subject();
  deleteSub?: Subscription;
  findAllSub?: Subscription;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoices$ = this.invoiceService.findAll();

    this.findAllSub = this.invoiceService
      .findAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (invoices) => (this.invoices = invoices),
        error: () =>
          (this.errorMessage =
            'Il y a eu un problème lors de la récupération des factures'),
      });
    //this.sortInvoicesByDateDesc();
  }

  /*sortInvoicesByDateDesc() {
    this.invoices$.pipe(
      map((invoices) =>
        invoices.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      )
    );
  }*/

  /*sortInvoicesByDateAsc() {
    this.invoices$.pipe(
      map((invoices) =>
        invoices.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      )
    );
  }*/

  deleteInvoice(id: number) {
    const oldInvoices = [...this.invoices];

    this.invoices = this.invoices.filter((item) => item.id !== id);

    this.deleteSub = this.invoiceService
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {},
        error: () => {
          this.errorMessage =
            'Il y a eu un problème lors de la suppression de la facture';
          this.invoices = oldInvoices;
        },
      });

    console.log('Invoice n°', id, 'deleted.');
  }

  ngOnDestroy() {
    this.findAllSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
  }
}
