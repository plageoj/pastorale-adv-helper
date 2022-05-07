import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
    StoreRoutingModule,
    PipesModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatButtonModule,
  ],
})
export class StoreModule {}
