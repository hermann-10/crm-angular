import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-detail',
  template: `
    <div class="text-center" *ngIf="invoice; as: invoice; else: fallBack">
      <h1>Nom du client : {{ invoice.customer_name }}</h1>

      <h3>Description : {{ invoice.description }}</h3>

      <h4>
        Créé le {{ invoice.created_at | date : 'short' : undefined : 'fr' }}
      </h4>

      <h4>Total : {{ invoice.total | currency : 'CHF' }}</h4>

      <p *ngIf="invoice.status === 'SENT'">
        Statut : <span class="badge bg-dark">Envoyé</span>
      </p>

      <p *ngIf="invoice.status === 'PAID'">
        Statut : <span class="badge bg-success">Payé</span>
      </p>

      <p *ngIf="invoice.status === 'CANCELED'">
        Statut : <span class="badge bg-danger">Annulé</span>
      </p>

      <div>
        <button class="btn btn-primary" (click)="goBack()">
          Retour à la liste
        </button>
      </div>
    </div>
    <ng-template #fallBack>
      <h3>Une erreur est survenue aucun document trouvé</h3>
      <a [routerLink]="['../..']" class="btn btn-primary"
        >Retourner à la liste</a
      >
    </ng-template>
  `,
  styles: [],
})
export class InvoiceDetailComponent implements OnInit {
  invoice!: Invoice;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.invoiceService
      .find(id)
      .subscribe((invoice: any) => (this.invoice = invoice));
  }

  public goBack() {
    this.router.navigate(['/invoices']);
  }
}
