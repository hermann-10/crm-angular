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
            <!-- <td>
              <span class="badge bg-success"> Payée </span>
            </td> -->

            <td>
              <span> {{ invoice.status }} </span>
            </td>

            <td>
              <a routerLink="/invoices/1" class="btn btn-sm btn-primary">
                Modifier
              </a>
              <button class="btn btn-sm ms-1 btn-danger">Supprimer</button>
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
  invoices!: any[];

  constructor(private invoiceService: invoiceService) {}

  ngOnInit(): void {
    console.log('INVOICES$ : ', this.invoiceService.findAll());

    this.invoices$ = this.invoiceService.findAll();
  }
}
