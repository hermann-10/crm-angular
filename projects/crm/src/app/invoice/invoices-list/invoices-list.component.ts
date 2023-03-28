import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../invoice';
import { invoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoices-list',
  template: `
    <div class="bg-light p-3 rounded">
      <h1>Liste de vos factures</h1>
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
            <td>{{ invoice.created_at | date }}</td>
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
                routerLink="/invoices/"
                class="btn btn-sm btn-primary disabled"
              >
                Modifier
              </a>
              <button class="btn btn-sm ms-1 btn-danger disabled">
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
  invoices$!: Observable<Invoice[]>;

  constructor(private invoiceService: invoiceService) {}

  ngOnInit(): void {
    console.log('INVOICES$ : ', this.invoiceService.findAll());
    this.invoices$ = this.invoiceService.findAll();

    this.invoices$.subscribe({
      
    })
       

  }
}
