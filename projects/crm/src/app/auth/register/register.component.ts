import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <div class="bg-light rounded p-3">
      <h1>Créer un compte sur NgCRM !</h1>
      <p>
        Vous pourrez alors gérer facilement vos factures en tant que Freelance !
      </p>
      <form [formGroup]="registerForm" (submit)="(onSubmit)">
        <div>
          <label class="mb-1" for="name">Nom d'utilisateur</label>
          <input
            formControlName="name"
            [class.is-invalid]="name.invalid && name.touched"
            type="text"
            placeholder="Votre nom d'utilisateur"
            name="name"
            id="name"
            class="mb-3 form-control"
          />
          <p class="invalid-feedback">Le nom d'utilisateur est obligatoire</p>
        </div>
        <div>
          <label class="mb-1" for="email">Adresse email</label>
          <input
            formControlName="email"
            [class.is-invalid]="email.invalid && email.touched"
            type="email"
            placeholder="Adresse email de connexion"
            name="email"
            id="email"
            class="mb-3 form-control"
          />
          <p class="invalid-feedback">L'adresse email doit être valide</p>
        </div>
        <div>
          <label class="mb-1" for="password">Mot de passe</label>
          <input
            formControlName="password"
            [class.is-invalid]="password.invalid && password.touched"
            type="password"
            placeholder="Votre mot de passe"
            name="password"
            id="password"
            class="mb-3 form-control"
          />
          <p class="invalid-feedback">
            Le mot de passe est obligatoire, doit faire 8 caractères minimum et
            contenir au moins un chiffre
          </p>
        </div>
        <div>
          <label class="mb-1" for="confirmPassword">Confirmation</label>
          <input
            formControlName="confirmPassword"
            [class.is-invalid]="
              (confirmPassword.invalid || registerForm.hasError('confirm')) &&
              confirmPassword.touched
            "
            type="password"
            placeholder="Confirmez votre mot de passe"
            name="confirmPassword"
            id="confirmPassword"
            class="mb-3 form-control"
          />

          <p
            class="invalid-feedback"
            *ngIf="confirmPassword.hasError('required')"
          >
            La confirmation du mot de passe est obligatoire
          </p>

          <p
            class="invalid-feedback"
            *ngIf="
              registerForm.hasError('confirm') &&
              !confirmPassword.hasError('required')
            "
          >
            La confirmation ne correspond pas au mot de passe
          </p>
        </div>
        <button class="btn btn-success" (click)="onSubmit()">
          Créer mon compte NgCRM !
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class RegisterComponent implements OnInit {
  confirmPasswordValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');

    if (password?.value === confirm?.value) {
      return null;
    }
    return {
      confirm: true,
    };
  };

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/\d+/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.confirmPasswordValidator,
    }
  );

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  uniqueEmailAsyncValidator(control: AbstractControl) {
    //return this.http.post<{exists:boolean}>('LINK', {
    //email: control.value
    //})
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  get name() {
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }
}
