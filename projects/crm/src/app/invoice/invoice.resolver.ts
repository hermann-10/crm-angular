import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from './invoice';
import { invoiceService } from './invoice.service';

@Injectable()
export class InvoiceResolver implements Resolve<Invoice[]> {
  constructor(private invoiceService: invoiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Invoice[] | Observable<Invoice[]> {
    return this.invoiceService.findAll();
  }
}
