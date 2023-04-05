import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Invoice } from '../invoice';
import { InvoiceFormType } from './invoice-form-type';

@Component({
  selector: 'app-invoice-form',
  template: `
    <form [formGroup]="invoiceForm" (submit)="onSubmit()">
      <app-invoice-form-general
        [parent]="invoiceForm"
      ></app-invoice-form-general>

      <hr />

      <app-invoice-form-details
        [parent]="invoiceForm"
        (add-detail)="onAddDetail()"
        (remove-detail)="onRemoveDetail($event)"
      ></app-invoice-form-details>

      <hr />

      <app-invoice-form-totals [total]="total"></app-invoice-form-totals>

      <div class="text-center">
        <div class="d-flex">
          <button class="w-sm-auto btn btn-success " id="submit">
            Enregistrer
          </button>

          <a class="btn btn-secondary" routerLink="/invoices"
            >Retour à la liste
          </a>

          <app-invoice-generate></app-invoice-generate>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class InvoiceFormComponent implements OnInit {
  @Output('invoice-submit') invoiceSubmitEvent = new EventEmitter<Invoice>();

  @Input() invoice?: Invoice;

  detailsExistsValidator: ValidatorFn = (control: AbstractControl) => {
    const details = control.get('details') as FormArray;

    return details.length > 0
      ? null
      : {
          noDetails: true,
        };
  };

  invoiceForm: InvoiceFormType = this.fb.group({
    customer_name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    status: ['SENT'],
    details: this.fb.array<FormGroup>([]),
  });

  /*invoiceForm: InvoiceFormType = this.fb.group(
    {
      customer_name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      status: [''],
      details: this.fb.array<
        FormGroup<{
          description: FormControl;
          amount: FormControl;
          quantity: FormControl;
        }>
      >([
        this.fb.group({
          amount: [''],
          description: [''],
          quantity: [''],
        }),
      ]),
    },
    {
      validators: this.detailsExistsValidator,
    }
  );*/

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.invoice) {
      return;
    }

    this.invoice.details.forEach((item) => this.onAddDetail());

    this.invoiceForm.patchValue(this.invoice);

    console.log('details ?: ', this.details.value);

    console.log(
      'this.invoiceForm.controls.details.value ?: ',
      this.invoiceForm.controls.details.value
    );
  }

  get details() {
    return this.invoiceForm.controls.details;
  }

  get total() {
    return this.details.value.reduce((itemTotal: number, item) => {
      return itemTotal + item.amount * item.quantity;
    }, 0);
  }

  onAddDetail() {
    this.details.push(
      this.fb.group({
        description: ['', [Validators.required, Validators.minLength(3)]],
        amount: ['', [Validators.required, Validators.minLength(0)]],
        quantity: ['', [Validators.required, Validators.minLength(0)]],
      })
    );
  }

  onRemoveDetail(index: number) {
    this.details.removeAt(index);
  }

  onSubmit() {
    console.log('this.invoiceForm.value:', this.invoiceForm.value);
    if (this.invoiceForm.invalid) {
      return;
    }
    this.invoiceSubmitEvent.emit(this.invoiceForm.value as Invoice);
  }
}
