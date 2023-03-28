import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService, TOKEN_MANAGER } from './auth/auth.service';
import { LocalStorageTokenManager, SessionStorageTokenManager } from './auth/token-manager.service';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [AuthGuard, AuthService, { provide: TOKEN_MANAGER, useClass: LocalStorageTokenManager}],
  bootstrap: [AppComponent],
})
export class AppModule {}
