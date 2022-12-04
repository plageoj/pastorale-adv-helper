import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  declarations: [ListComponent, DetailComponent, ReportComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSnackBarModule,
    MatToolbarModule,
    PipesModule,
    ReactiveFormsModule,
    StoreRoutingModule,
  ],
})
export class StoreModule {}
