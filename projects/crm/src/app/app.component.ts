import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">NgCRM</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" *ngIf="isAuthenticated$ | async">
              <!-- <a class="nav-link" routerLink="/invoices">Factures</a>-->
              <a class="nav-link" routerLink="#">Factures</a>
              <!-- Available soon -->
            </li>
            <li class="nav-item">
              <!--<a class="nav-link" routerLink="/invoices/create">+ Créer</a>-->
              <a class="nav-link" routerLink="#">+ Créer</a>
              <!-- Available soon -->
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                id="login"
                routerLink="/account/login"
                class="btn btn-success btn-sm"
                >Connexion</a
              >
            </li>
            <li class="nav-item">
              <a
                id="register"
                routerLink="/account/register"
                class="btn btn-info btn-sm"
                >Inscription</a
              >
            </li>
            <li class="nav-item">
              <button
                id="logout"
                class="btn btn-danger btn-sm"
                (click)="onLogout()"
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container pt-5">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  isAuthenticated$?: Observable<boolean>;
  //isAuthenticated = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    
    this.isAuthenticated$ = this.auth.authStatus$;
    
    /*this.auth.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
    });*/
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/account/login')
  }
}
