import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [LoginComponent, UnauthorizedComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
