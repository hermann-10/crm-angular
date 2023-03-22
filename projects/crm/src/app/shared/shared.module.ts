import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authenticatedDirective } from './directives/authenticated.directive';



@NgModule({
  declarations: [authenticatedDirective],
  imports: [
    CommonModule
  ],
  exports: [
    authenticatedDirective
  ]
})
export class SharedModule { }
