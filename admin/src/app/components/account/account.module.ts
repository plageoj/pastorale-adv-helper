import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [LoginComponent, UnauthorizedComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class AccountModule {}
