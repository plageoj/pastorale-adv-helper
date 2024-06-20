import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
// import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({ declarations: [ListComponent, DetailComponent, ReportComponent], imports: [CommonModule,
        GoogleMapsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatToolbarModule,
        PipesModule,
        ReactiveFormsModule,
        StoreRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())] })
export class StoreModule {}
